import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase } from "./redux/counterSlice";
function App() {
	const counter = useSelector((state) => state.counter);

	const dispatch = useDispatch();

	const handleIncrease = () => {
		const action = increase();
		dispatch(action);
	};

	return (
		<div>
			<h1>Khoa</h1>
			<h2>{counter}</h2>

			<button onClick={handleIncrease}>increase</button>
			<button onClick={() => dispatch(decrease())}>decrease</button>
		</div>
	);
}

export default App;
