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
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AlertMessage from "../layout/Alert";

const UpdatePostForm = ({ onCloseAddForm }) => {
	const dispatch = useDispatch();
	const postsState = useSelector((state) => state.posts);
	const { post } = postsState;

	const [formValue, setFormValue] = useState(post);
	const { title, des, status } = formValue;
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
		// setFormValue({
		// 	title: "",
		// 	des: "",
		// });
		try {
			const response = await postApi.updatePost(formValue);
			if (response.data.success) {
				dispatch(updatePost(response.data.post));
				setAlert({ type: "success", message: response.data.message });
			} else {
				console.log(response);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const resetAddPostData = () => {
		setFormValue({ title: "", des: "" });
		// setShowAddPostModal(false);
		dispatch(selectPost(null));
	};
	const closeDialog = () => {
		resetAddPostData();
		// onCloseAddForm();
	};

	return (
		<>
			<Modal show={true} onHide={closeDialog}>
				<Modal.Header closeButton>
					<Modal.Title>What do you want to learn?</Modal.Title>
				</Modal.Header>
				<AlertMessage info={alert} />
				<Form onSubmit={handleOnSubmit}>
					<Modal.Body>
						<Form.Group>
							<Form.Control
								type="text"
								placeholder="Title"
								name="title"
								required
								aria-describedby="title-help"
								value={title}
								onChange={handleInputChange}
							/>
							<Form.Text id="title-help" muted>
								Required
							</Form.Text>
						</Form.Group>
						<Form.Group>
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="Description"
								name="des"
								value={des}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className="mt-3">
							<Form.Control
								as="select"
								value={status}
								name="status"
								onChange={handleInputChange}
							>
								<option value="TO DO">TO DO</option>
								<option value="DOING">DOING</option>
								<option value="DONE">DONE</option>
							</Form.Control>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeDialog}>
							Cancel
						</Button>
						<Button variant="primary" type="submit">
							Update!
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default UpdatePostForm;
