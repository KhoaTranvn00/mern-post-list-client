import React from "react";

const Alert = ({ info }) => {
	return <div>{info === null ? null : <h2>{info.message}</h2>}</div>;
};

export default Alert;
