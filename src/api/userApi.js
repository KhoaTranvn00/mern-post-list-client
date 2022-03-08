import axiosClient from "./axiosClient";

const userApi = {
	loadUser: () => {
		return axiosClient.get("/user");
	},

	login: async (formValue) => {
		return axiosClient.post("/user/login", formValue);
	},
};

export default userApi;
