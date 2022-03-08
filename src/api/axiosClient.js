import axios from "axios";

const axiosClient = axios.create({
	baseURL: "http://localhost:4000/api",
	headers: {
		"content-type": "application/json",
	},
});

export default axiosClient;
