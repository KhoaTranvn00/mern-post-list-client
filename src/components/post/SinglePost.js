import React from "react";
import { useDispatch } from "react-redux";
import postApi from "../../api/postApi";
// import postApi from "../api/postApi";
import { deletePost, selectPost } from "../../redux/postSlice";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButtons from "./ActionButtons";

const SinglePost = ({ post: { title, des, _id, status } }) => {
	const dispatch = useDispatch();
	const handleDelete = async (id) => {
		try {
			const response = await postApi.deletePost(id);
			if (response.data.success) {
				dispatch(deletePost(id));
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Card
				className="shadow"
				border={
					status === "DONE"
						? "success"
						: status === "DOING"
						? "warning"
						: "danger"
				}
			>
				<Card.Body>
					<Card.Title>
						<Row>
							<Col>
								<p className="post-title">{title}</p>
								<Badge
									pill
									bg={
										status === "DONE"
											? "success"
											: status === "DOING"
											? "warning"
											: "danger"
									}
								>
									{status}
								</Badge>
							</Col>

							<Col className="text-right" style={{ textAlign: "right" }}>
								<ActionButtons _id={_id} />
							</Col>
						</Row>
					</Card.Title>
					<Card.Text>{des}</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
};

export default SinglePost;
