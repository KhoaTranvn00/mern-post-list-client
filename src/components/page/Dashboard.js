import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPost } from "../../redux/postSlice";
import AddPostForm from "../post/AddPostForm";
import UpdatePostForm from "../post/UpdatePostForm";
import SinglePost from "../post/SinglePost";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import addIcon from "../../assets/plus-circle-fill.svg";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const Dashboard = () => {
	const userState = useSelector((state) => state.user);
	const {
		user: { username },
	} = userState;
	const postsState = useSelector((state) => state.posts);
	const { posts, post, isPostLoading } = postsState;
	const dispatch = useDispatch();

	const [showAddPostForm, setShowAddPostForm] = useState(false);

	useEffect(() => {
		const loading = async () => {
			try {
				const actionResult = await dispatch(loadPost());
				const postReducer = unwrapResult(actionResult);
			} catch (error) {
				console.log(error);
			}
		};
		loading();
	}, []);

	const handleCloseAddForm = () => {
		setShowAddPostForm(false);
	};

	let body;
	if (isPostLoading) body = <h1>Loading...</h1>;
	else if (posts.length === 0)
		body = (
			<>
				<Card className="text-center mx-5 my-5">
					<Card.Header as="h1">Hi {username}</Card.Header>
					<Card.Body>
						<Card.Title>Welcome to Post List</Card.Title>
						<Card.Text>
							Click the button below to create one work to doing
						</Card.Text>
						<Button variant="primary" onClick={() => setShowAddPostForm(true)}>
							Create!
						</Button>
					</Card.Body>
				</Card>
			</>
		);
	else
		body = (
			<>
				<Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
					{posts.map((post) => (
						<Col key={post._id} className="my-2">
							<SinglePost post={post} />
						</Col>
					))}
				</Row>
			</>
		);
	return (
		<>
			{showAddPostForm && <AddPostForm onCloseAddForm={handleCloseAddForm} />}
			{post && <UpdatePostForm />}

			{body}

			<OverlayTrigger
				placement="left"
				overlay={<Tooltip>Add a new thing to to</Tooltip>}
			>
				<Button
					className="btn-floating"
					onClick={() => setShowAddPostForm(true)}
					style={{ background: "transparent", border: "none" }}
				>
					<img src={addIcon} alt="add-post" width="60" height="60" />
				</Button>
			</OverlayTrigger>
		</>
	);
};

export default Dashboard;
