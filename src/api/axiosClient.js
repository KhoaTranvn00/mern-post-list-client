import axios from "axios";

const axiosClient = axios.create({
	baseURL:
		process.env.NODE_ENV !== "production"
			? "http://localhost:4000/api"
			: "https://mern-post-list.herokuapp.com/api",
	headers: {
		"content-type": "application/json",
	},
});

export default axiosClient;
