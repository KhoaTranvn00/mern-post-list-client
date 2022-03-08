import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPost } from "../../redux/postSlice";
import AddPostForm from "../post/AddPostForm";
import UpdatePostForm from "../post/UpdatePostForm";
import SinglePost from "../SinglePost";

const Dashboard = () => {
	const postsState = useSelector((state) => state.posts);
	const { posts, post, isPostLoading } = postsState;
	const dispatch = useDispatch();

	const [showAddPostForm, setShowAddPostForm] = useState(false);

	useEffect(() => {
		const loading = async () => {
			try {
				const actionResult = await dispatch(loadPost());
				const postReducer = unwrapResult(actionResult);
			} catch (error) {
				console.log(error);
			}
		};
		loading();
	}, []);

	const handleCloseAddForm = () => {
		setShowAddPostForm(false);
	};

	let body;
	if (isPostLoading) body = <h1>Loading...</h1>;
	else if (posts.length === 0) body = <button>theo post moi</button>;
	else
		body = (
			<>
				<button onClick={() => setShowAddPostForm(true)}>
					theo post moiiii
				</button>
				{showAddPostForm && <AddPostForm onCloseAddForm={handleCloseAddForm} />}
				{post && <UpdatePostForm />}
				{posts.map((post) => (
					<SinglePost post={post} />
				))}
			</>
		);
	return body;
};

export default Dashboard;
