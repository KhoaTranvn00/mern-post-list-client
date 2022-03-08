import React, { useState } from "react";
import { useDispatch } from "react-redux";
import postApi from "../../api/postApi";
import { addPost, offAddPostForm } from "../../redux/postSlice";

const AddPostForm = ({ onCloseAddForm }) => {
	const dispatch = useDispatch();
	const [formValue, setFormValue] = useState({
		title: "",
		des: "",
	});
	const { title, des } = formValue;

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
			const response = await postApi.addPost(formValue);
			if (response.data.success) {
				dispatch(addPost(response.data.newPost));
			} else {
				console.log(response);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleOnSubmit}>
			add post form
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
			<button type="submit">them post</button>
			<button onClick={onCloseAddForm}>Dong</button>
		</form>
	);
};

export default AddPostForm;
