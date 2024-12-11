import "./Chatbot.css";
import chatbot from "./../../assets/chatbot.png";
import send from "./../../assets/send.png";
import UserComment from "./UserComment";
import BotComment from "./BotComment";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Chatbot = () => {
	const textarea = document.querySelector(".chatbot-input textarea");
	const { isAuthenticated, user, chat } = useContext(AuthContext);
	const maxLines = 7;
	const minHeight = 40;
	const lineHeight = 18;

	function resizeTextarea() {
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

	const handleinput = () => {
		textarea.addEventListener("input", resizeTextarea);
	};

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
							<UserComment />
							<BotComment />
							<UserComment />
							<BotComment />
						</div>
					) : (
						display1
					)}
				</div>
				{isAuthenticated ? (
					<div className="chatbot-input">
						<textarea
							type="text"
							placeholder="Message CryptoBot"
							onChange={handleinput}
						/>
						<img src={send} alt="send" />
					</div>
				) : (
					display2
				)}
			</div>
		)
	);
};

export default Chatbot;
