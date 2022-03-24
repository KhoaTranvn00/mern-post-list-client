import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../constant";
import { loadUser } from "../../redux/userSlice";
import Alert from "../Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = () => {
	const [formValue, setFormValue] = useState({
		username: "",
		password: "",
	});

	const [alert, setAlert] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { username, password } = formValue;

	const handleInputChange = (e) => {
		setFormValue((state) => ({ ...state, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await userApi.login(formValue);
			if (response.data.success) {
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					response.data.accessToken
				);
				try {
					const actionResult = await dispatch(loadUser());
					const currentUser = unwrapResult(actionResult);
				} catch (error) {
					console.log(error);
				}
				navigate("/dashboard");
			} else {
				setAlert(response.data.message);
			}
		} catch (error) {
			setAlert({ type: "danger", message: error.response.data.message });
		}
	};

	return (
		<>
			<Form className="my-4" onSubmit={handleSubmit}>
				<Alert info={alert} />

				<Form.Group className="mb-3">
					<Form.Control
						type="text"
						placeholder="Username"
						name="username"
						required
						value={username}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Control
						type="password"
						placeholder="Password"
						name="password"
						required
						value={password}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Button variant="success" type="submit">
					Login
				</Button>
			</Form>
			<p>
				Don't have an account?
				<Link to="../register">
					<Button variant="info" size="sm" className="ml-3">
						Register
					</Button>
				</Link>
			</p>
		</>
	);
};

export default Login;
