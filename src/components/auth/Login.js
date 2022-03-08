import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import userApi from "../../api/userApi";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../constant";
import { loadUser } from "../../redux/userSlice";
import Alert from "../Alert";

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
			setAlert({ message: error.response.data.message });
		}
	};

	return (
		<div>
			<Alert info={alert} />
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={username}
					onChange={handleInputChange}
					name="username"
					placeholder="Username"
				></input>
				<input
					type="password"
					value={password}
					onChange={handleInputChange}
					name="password"
					placeholder="password"
				></input>
				<button type="submit">Dang nhap</button>
				<Link to="../register">dang ki</Link>
			</form>
		</div>
	);
};

export default Login;
