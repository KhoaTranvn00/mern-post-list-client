import axiosClient from "./axiosClient";

const userApi = {
	loadUser: () => {
		return axiosClient.get("/user");
	},

	login: async (formValue) => {
		return axiosClient.post("/user/login", formValue);
	},
	register: async (formValue) => {
		return axiosClient.post("/user/register", formValue);
	},
};

export default userApi;
