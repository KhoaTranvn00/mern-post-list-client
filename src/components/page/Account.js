import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Account = () => {
	const userCurrent = useSelector((state) => state.user);

	const { isAuthSuccess } = userCurrent;

	if (isAuthSuccess) return <Navigate to="/dashboard" />;
	else
		return (
			<div className="landing">
				<div className="dark-overlay">
					<div className="landing-inner">
						<h1>POST LIST</h1>
						{/* <h4>Keep track of what you are learning</h4> */}
						<Outlet />
					</div>
				</div>
			</div>
		);
};

export default Account;
