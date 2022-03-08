import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Nav from "../layout/Nav";

const ProtectRoute = () => {
	const userCurrent = useSelector((state) => state.user);
	const { isAuthLoading, isAuthSuccess } = userCurrent;

	if (isAuthLoading) return <h1>Loading...</h1>;
	else
		return (
			<div>
				{isAuthSuccess ? (
					<>
						<Nav />
						<Outlet />
					</>
				) : (
					<Navigate to="/" />
				)}
			</div>
		);
};

export default ProtectRoute;
