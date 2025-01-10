import "./Chatbot.css";
import chatbot from "./../../assets/chatbot.png";
import send from "./../../assets/send.png";
import UserComment from "./UserComment";
import BotComment from "./BotComment";
import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import { useChat } from "./useChat";
import { useEffect } from "react";

const Chatbot = () => {
	const { chatHistory, setChatHistory } = useChat();
	const textareaRef = useRef(null);
	const chatMessagesEndRef = useRef(null);
	const { isAuthenticated, user, chat } = useContext(AuthContext);
	const [userInput, setUserInput] = useState("");
	const maxLines = 7;
	const minHeight = 40;
	const lineHeight = 18;

	function resizeTextarea() {
		const textarea = textareaRef.current;
		textarea.style.height = "auto";

		const numberOfLines = Math.min(
			Math.floor(textarea.scrollHeight / lineHeight),
			maxLines
		);

		const newHeight = numberOfLines * lineHeight;

		if (numberOfLines <= 3) {
			textarea.style.height = `${minHeight}px`;
		} else {
			textarea.style.height = `${newHeight}px`;
		}
	}

	const handleinput = (e) => {
		const textarea = textareaRef.current;
		setUserInput(e.target.value);
		textarea.addEventListener("input", resizeTextarea);
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setChatHistory((prevHistory) => [...prevHistory, userInput]);
		const data = { prompt: userInput, chatHistory };
		setUserInput("");
		try {
			console.log("sending to backend");
			const response = await fetch(
				"http://localhost:3000/api/v1/chatbot/chat",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);
			if (response.ok) {
				const result = await response.json();
				const botReply = result.response;
				setChatHistory((prevHistory) => [...prevHistory, botReply]);
			} else {
				console.error(
					"Failed to fetch the response from the backend! Please try again later"
				);
			}
		} catch (error) {
			console.error("Error : ", error);
		}
	};

	useEffect(() => {
		if (chatMessagesEndRef.current) {
			chatMessagesEndRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	}, [chatHistory]);

	const display1 = (
		<div className="chatbot-header" id="query">
			Please Login to use this feature.
		</div>
	);

	const display2 = <div></div>;

	return (
		chat && (
			<div className="chatbot-outer-container">
				<div className="chatbot-upper">
					<div className="chatbot-image">
						<div className="chatbot-image-border">
							<img src={chatbot} alt="CryptoBot" />
						</div>
					</div>
					{isAuthenticated ? (
						<div className="chatbot-header">
							<span id="name">Hi {user}!</span>
							<span id="query">How can I help you today?</span>
						</div>
					) : (
						display2
					)}
					{isAuthenticated ? (
						<div className="chatbot-messages">
							{chatHistory.map((message, index) =>
								index % 2 === 0 ? (
									<UserComment key={index} message={message} />
								) : (
									<BotComment key={index} message={message} />
								)
							)}
							<div ref={chatMessagesEndRef} />
						</div>
					) : (
						display1
					)}
				</div>
				{isAuthenticated ? (
					<form onSubmit={handleSubmit}>
						<div className="chatbot-input">
							<textarea
								type="text"
								ref={textareaRef}
								placeholder="Message CryptoBot"
								value={userInput}
								onChange={handleinput}
								onKeyDown={handleKeyDown}
							/>
							<button type="submit">
								<img src={send} alt="send" />
							</button>
						</div>
					</form>
				) : (
					display2
				)}
			</div>
		)
	);
};

export default Chatbot;
