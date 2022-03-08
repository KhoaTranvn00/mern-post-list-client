import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import userReducer from "./userSlice";

const rootReducer = {
	user: userReducer,
	posts: postReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
