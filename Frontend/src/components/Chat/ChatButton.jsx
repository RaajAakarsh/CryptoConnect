import "./ChatButton.css";
import chatButton from "./../../assets/chatbot1.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const ChatButton = () => {
	const { setChat, chat } = useContext(AuthContext);

	const handleClick = () => {
		setChat(!chat);
	};
	return (
		<div className="chat-button-outer-container">
			<img src={chatButton} alt="chat" onClick={handleClick} />
		</div>
	);
};

export default ChatButton;
