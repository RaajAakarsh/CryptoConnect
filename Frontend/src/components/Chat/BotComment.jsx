import "./BotComment.css";

const BotComment = ({ message }) => {
	return (
		<div className="bot-comment-outercontainer">
			<div className="bot-comment-message">{message}</div>
		</div>
	);
};

export default BotComment;
