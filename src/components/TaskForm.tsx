import React, { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import { Button } from "./Button";

type TaskFormProps = {
	onSubmit: (title: string, description: string) => void;
	initialTitle?: string;
	initialDescription?: string;
	buttonText?: string;
};

export const TaskForm: React.FC<TaskFormProps> = ({
	onSubmit,
	initialTitle = "",
	initialDescription = "",
	buttonText = "Add Task",
}) => {
	const [title, setTitle] = useState(initialTitle);
	const [description, setDescription] = useState(initialDescription);
	const [isTitleValid, setIsTitleValid] = useState(true);
	const [isDescriptionValid, setIsDescriptionValid] = useState(true);

	useEffect(() => {
		setTitle(initialTitle);
		setDescription(initialDescription);
	}, [initialTitle, initialDescription]);

	const validateForm = () => {
		setIsTitleValid(!!title.trim());
		setIsDescriptionValid(!!description.trim());
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		validateForm();

		if (title.trim() && description.trim()) {
			onSubmit(title.trim(), description.trim());
			setTitle("");
			setDescription("");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-6"
			onChange={validateForm}
		>
			<div>
				<label
					htmlFor="title"
					className="block text-sm font-medium text-gray-700"
				>
					Title
				</label>
				<input
					id="title"
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className={`mt-1 block w-full rounded-md border-2 px-4 py-2 focus:ring-1 focus:outline-none focus:ring-blue-500 shadow-sm 
            ${
				isTitleValid
					? "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
					: "border-red-500 focus:border-red-500 focus:ring-red-500"
			} 
            transition-all duration-300`}
					placeholder="Enter task title"
					required
				/>
				{!isTitleValid && (
					<ErrorMessage message="Title is required." />
				)}
			</div>

			<div>
				<label
					htmlFor="description"
					className="block text-sm font-medium text-gray-700"
				>
					Description
				</label>
				<textarea
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className={`mt-1 block w-full rounded-md border-2 px-4 py-2 focus:ring-1 focus:outline-none focus:ring-blue-500 shadow-sm 
            ${
				isDescriptionValid
					? "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
					: "border-red-500 focus:border-red-500 focus:ring-red-500"
			} 
            transition-all duration-300`}
					placeholder="Enter task description"
					rows={4}
					required
				/>
				{!isDescriptionValid && (
					<ErrorMessage message="Description is required." />
				)}
			</div>

			<div className="flex justify-end">
				<Button
					type="submit"
					disabled={!isTitleValid || !isDescriptionValid}
				>
					{buttonText}
				</Button>
			</div>
		</form>
	);
};
