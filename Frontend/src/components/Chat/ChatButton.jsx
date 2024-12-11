import "./ChatButton.css";
import Chatbot from "./Chatbot";
import chatButton from "./../../assets/chatbot1.png";

const ChatButton = () => {
	return (
		<div className="chat-button-outer-container">
			<img src={chatButton} alt="chat" />
		</div>
	);
};

export default ChatButton;
