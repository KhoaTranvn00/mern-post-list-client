import React, { useState } from "react";
import { useDispatch } from "react-redux";
import postApi from "../../api/postApi";
import { addPost, offAddPostForm } from "../../redux/postSlice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AlertMessage from "../layout/Alert";

const AddPostForm = ({ onCloseAddForm }) => {
	const dispatch = useDispatch();
	const [formValue, setFormValue] = useState({
		title: "",
		des: "",
	});
	const [showAddPostModal, setShowAddPostModal] = useState(true);
	const { title, des } = formValue;

	const [alert, setAlert] = useState(null);

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
				setAlert({ type: "success", message: response.data.message });
			} else {
				console.log(response);
				setAlert({ type: "danger", message: response.data.message });
			}
		} catch (error) {
			console.log(error);
		}
	};
	const resetAddPostData = () => {
		setFormValue({ title: "", des: "" });
		setShowAddPostModal(false);
	};
	const closeDialog = () => {
		resetAddPostData();
		onCloseAddForm();
	};

	return (
		<>
			<Modal show={true} onHide={closeDialog}>
				<Modal.Header closeButton>
					<Modal.Title>What do you want to do?</Modal.Title>
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
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeDialog}>
							Cancel
						</Button>
						<Button variant="primary" type="submit">
							Create!
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default AddPostForm;
