import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postApi from "../api/postApi";

export const loadPost = createAsyncThunk("posts/loadPost", async () => {
	return postApi.getAll();
});

const postSlice = createSlice({
	name: "posts",
	initialState: {
		posts: [],
		post: null,
		isPostLoading: false,
	},
	reducers: {
		addPost: (state, action) => {
			state.posts.push(action.payload);
		},
		deletePost: (state, action) => {
			state.posts = state.posts.filter((post) => post._id !== action.payload);
		},
		selectPost: (state, action) => {
			state.post = state.posts.find((post) => post._id === action.payload);
		},
		updatePost: (state, action) => {
			state.posts = state.posts.map((post) =>
				post._id === action.payload._id ? action.payload : post
			);
		},
	},
	extraReducers: {
		[loadPost.pending]: (state) => {
			state.isPostLoading = true;
		},
		[loadPost.rejected]: (state) => {
			state.isPostLoading = false;
			state.posts = [];
		},
		[loadPost.fulfilled]: (state, action) => {
			state.isPostLoading = false;
			state.posts = action.payload.data.posts;
		},
	},
});

const { reducer: postReducer, actions } = postSlice;
export const { addPost, deletePost, selectPost, updatePost } = actions;
export default postReducer;
