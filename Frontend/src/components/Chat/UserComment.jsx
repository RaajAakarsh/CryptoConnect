import "./UserComment.css";

const UserComment = ({ message }) => {
	return (
		<div className="user-comment-outercontainer">
			<div className="user-comment-message">{message}</div>
		</div>
	);
};

export default UserComment;
