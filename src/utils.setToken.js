import axiosClient from "./api/axiosClient";

const setToken = (token) => {
	if (token) {
		axiosClient.defaults.headers.common["Authorization"] = `Bear ${token}`;
	} else delete axiosClient.defaults.headers.common["Authorization"];
};

export default setToken;
