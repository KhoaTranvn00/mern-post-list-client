import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../constant";
import { loadUser } from "../../redux/userSlice";

const Nav = () => {
	const userState = useSelector((state) => state.user);
	const {
		user: { username },
	} = userState;

	const dispatch = useDispatch();

	const handleLogout = async () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
		await dispatch(loadUser());
	};

	return (
		<ul>
			<li>Welcome {username}</li>
			<li>
				<li>
					<Link to="/about">about</Link>
				</li>
			</li>
			<li>
				<button onClick={handleLogout}>dang xuat</button>
			</li>
		</ul>
	);
};

export default Nav;
