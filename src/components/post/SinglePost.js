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

const SinglePost = ({ post: { title, des, _id } }) => {
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
			{/* <div style={{ border: "1px solid black", margin: "10px" }}>
				<h3>{title}</h3>
				<p>{des}</p>
				<button onClick={() => dispatch(selectPost(_id))}>sua</button>
				<button onClick={() => handleDelete(_id)}>xoa</button>
			</div> */}
			<Card className="shadow" border="success">
				<Card.Body>
					<Card.Title>
						<Row>
							<Col>
								<p className="post-title">{title}</p>
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
