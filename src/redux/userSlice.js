import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";
import { LOCAL_STORAGE_TOKEN_NAME } from "../constant";
import setToken from "../utils.setToken";

export const loadUser = createAsyncThunk(
	"user/loadUser",
	async (params, thunkAPI) => {
		if (localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)) {
			setToken(localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME));
		} else {
			setToken(null);
		}
		const userCurrent = await userApi.loadUser();
		return userCurrent;
	}
);

const userSlice = createSlice({
	name: "user",
	initialState: {
		isAuthLoading: true,
		isAuthSuccess: false,
		user: null,
	},
	reducers: {
		setUser: (state, action) => {
			state = action;
			state.isAuthLoading = false;
			return state;
		},
	},
	extraReducers: {
		[loadUser.pending]: (state, action) => {
			state.isAuthLoading = true;
		},
		[loadUser.rejected]: (state, action) => {
			state.isAuthLoading = false;
			state.isAuthSuccess = false;
		},
		[loadUser.fulfilled]: (state, action) => {
			state.isAuthLoading = false;
			state.isAuthSuccess = true;
			state.user = action.payload.data.user;
		},
	},
});

const { actions, reducer } = userSlice;
export const { setUser } = actions;
export default reducer;
