import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Account = () => {
	const userCurrent = useSelector((state) => state.user);

	const { isAuthSuccess } = userCurrent;

	if (isAuthSuccess) return <Navigate to="/dashboard" />;
	else
		return (
			<div>
				<h1>Account</h1>
				<Outlet />
			</div>
		);
};

export default Account;
