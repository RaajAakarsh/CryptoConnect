import "./BotComment.css";
import { SyncLoader } from "react-spinners";

const LoaderComment = () => {
	return (
		<div className="bot-comment-outercontainer">
			<div className="bot-comment-message">
				<SyncLoader color="#000" size={10} />
			</div>
		</div>
	);
};

export default LoaderComment;
