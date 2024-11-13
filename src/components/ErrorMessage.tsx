import React from "react";
interface IProp {
	message: string;
}
const ErrorMessage: React.FC<IProp> = ({ message }) => {
	return <p className="text-sm text-red-500 mt-1">{message}</p>;
};

export default ErrorMessage;
