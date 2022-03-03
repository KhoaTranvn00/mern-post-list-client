import { createSlice } from "@reduxjs/toolkit";

const counter = createSlice({
	name: "counter",
	initialState: 3,
	reducers: {
		increase: (state, action) => {
			return state + 1;
		},
		decrease: (state, action) => {
			return state - 1;
		},
	},
});

const { actions, reducer } = counter;
export const { increase, decrease } = actions;
export default reducer;
