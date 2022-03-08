import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import postApi from "../../api/postApi";
import {
	addPost,
	offAddPostForm,
	selectPost,
	updatePost,
} from "../../redux/postSlice";
import Alert from "../layout/Alert";

const UpdatePostForm = ({ onCloseAddForm }) => {
	const dispatch = useDispatch();
	const postsState = useSelector((state) => state.posts);
	const { post } = postsState;

	const [formValue, setFormValue] = useState(post);
	const { title, des } = formValue;
	const [alert, setAlert] = useState(null);

	useEffect(() => {
		setFormValue(post);
	}, [post]);

	const handleInputChange = (e) => {
		setFormValue((state) => ({
			...state,
			[e.target.name]: e.target.value,
		}));
	};

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		setFormValue({
			title: "",
			des: "",
		});
		try {
			const response = await postApi.updatePost(formValue);
			if (response.data.success) {
				dispatch(updatePost(response.data.post));
				setAlert({ message: response.data.message });
			} else {
				console.log(response);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleOnSubmit}>
			update post form
			<Alert info={alert} />
			<input
				type="text"
				name="title"
				placeholder="title"
				value={title}
				onChange={handleInputChange}
			/>
			<input
				type="text"
				name="des"
				placeholder="des"
				value={des}
				onChange={handleInputChange}
			/>
			<button type="submit">sua post</button>
			<button onClick={() => dispatch(selectPost(null))}>Dong</button>
		</form>
	);
};

export default UpdatePostForm;
