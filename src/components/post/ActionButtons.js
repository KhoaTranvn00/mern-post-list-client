import Button from "react-bootstrap/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import postApi from "../../api/postApi";
import { useDispatch } from "react-redux";
import { deletePost, selectPost } from "../../redux/postSlice";

const ActionButtons = ({ url, _id }) => {
	// const { deletePost, findPost, setShowUpdatePostModal } =
	// 	useContext(PostContext);

	// const choosePost = (postId) => {
	// 	findPost(postId);
	// 	setShowUpdatePostModal(true);
	// };

	const dispatch = useDispatch();
	const handleDelete = async (id) => {
		try {
			const response = await postApi.deletePost(id);
			if (response.data.success) {
				dispatch(deletePost(id));
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Button
				className="post-button button"
				onClick={() => dispatch(selectPost(_id))}
			>
				<img src={editIcon} alt="edit" width="24" height="24" />
			</Button>
			<Button className="post-button button" onClick={() => handleDelete(_id)}>
				<img src={deleteIcon} alt="delete" width="24" height="24" />
			</Button>
		</>
	);
};

export default ActionButtons;
