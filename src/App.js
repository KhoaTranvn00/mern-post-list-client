import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./components/page/Account";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/Landing";
import Dashboard from "./components/page/Dashboard";
import ProtectRoute from "./components/route/ProtectRoute";
import { loadUser } from "./redux/userSlice";
import "./App.css";
function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const loading = async () => {
			try {
				const actionResult = await dispatch(loadUser());
				const currentUser = unwrapResult(actionResult);
			} catch (error) {
				console.log(error);
			}
		};
		loading();
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="account" element={<Account />}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
				<Route element={<ProtectRoute />}>
					<Route path="dashboard" element={<Dashboard />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
