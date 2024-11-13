import React from "react";

type ButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	className = "",
	type = "button",
	disabled = false,
}) => {
	return (
		<button
			onClick={onClick}
			type={type}
			disabled={disabled}
			className={`px-6 py-3 font-semibold rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white 
      hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 
      disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ${className}`}
		>
			{children}
		</button>
	);
};
