import axiosClient from "./axiosClient";

const postApi = {
	getAll: () => {
		return axiosClient.get("/post");
	},
	addPost: (formValue) => {
		return axiosClient.post("/post/add", formValue);
	},
	deletePost: (id) => {
		return axiosClient.delete(`/post/${id}`);
	},
	updatePost: (post) => {
		return axiosClient.put(`/post/${post._id}`, post);
	},
};

export default postApi;
