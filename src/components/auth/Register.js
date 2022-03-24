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

const Register = () => {
	const [formValue, setFormValue] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	});

	const [alert, setAlert] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { username, password, confirmPassword } = formValue;

	const handleInputChange = (e) => {
		setFormValue((state) => ({ ...state, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password.length <= 6) {
			return setAlert({
				type: "danger",
				message: "Password must be more than 6 characters",
			});
		}
		if (password !== confirmPassword) {
			return setAlert({
				type: "danger",
				message: "Confirm Password is incorrect",
			});
		}
		try {
			const response = await userApi.register(formValue);
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
				setAlert({ type: "danger", message: response.data.message });
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
				<Form.Group className="mb-3">
					<Form.Control
						type="password"
						placeholder="Confirm Password"
						name="confirmPassword"
						required
						value={confirmPassword}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Button variant="success" type="submit">
					Register
				</Button>
			</Form>
			<p>
				Already have an account?
				<Link to="../login">
					<Button variant="info" size="sm" className="ml-2">
						Login
					</Button>
				</Link>
			</p>
		</>
	);
};

export default Register;
