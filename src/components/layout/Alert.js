import React from "react";

const Alert = ({ info }) => {
	return <>{info === null ? null : <h1>{info.message}</h1>}</>;
};

export default Alert;
