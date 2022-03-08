import React from "react";
import { useDispatch } from "react-redux";
import postApi from "../api/postApi";
import { deletePost, selectPost } from "../redux/postSlice";

const SinglePost = ({ post: { title, des, _id } }) => {
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
		<div style={{ border: "1px solid black", margin: "10px" }}>
			<h3>{title}</h3>
			<p>{des}</p>
			<button onClick={() => dispatch(selectPost(_id))}>sua</button>
			<button onClick={() => handleDelete(_id)}>xoa</button>
		</div>
	);
};

export default SinglePost;
