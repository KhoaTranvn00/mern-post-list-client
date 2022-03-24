import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../constant";
import { loadUser } from "../../redux/userSlice";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const NavbarMenu = () => {
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
		<>
			<Navbar expand="lg" bg="primary" variant="dark" className="shadow">
				<Container>
					<Navbar.Brand className="font-weight-bolder text-white">
						<img
							src={learnItLogo}
							alt="learnItLogo"
							width="32"
							height="32"
							className="mr-2"
						/>
						PostLIst
					</Navbar.Brand>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />

					<Navbar.Collapse
						id="basic-navbar-nav"
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "baseline",
						}}
					>
						<Nav className="mr-auto">
							<Nav.Link
								className="font-weight-bolder text-white"
								to="/dashboard"
								as={Link}
							>
								Dashboard
							</Nav.Link>
							<Nav.Link
								className="font-weight-bolder text-white"
								to="/about"
								as={Link}
							>
								About
							</Nav.Link>
						</Nav>

						<Nav>
							<Nav.Link className="font-weight-bolder text-white" disabled>
								Welcome {username}
							</Nav.Link>
							<Button
								variant="secondary"
								className="font-weight-bolder text-white"
								onClick={handleLogout}
							>
								<img
									src={logoutIcon}
									alt="logoutIcon"
									width="32"
									height="32"
									className="mr-2"
								/>
								Logout
							</Button>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default NavbarMenu;
