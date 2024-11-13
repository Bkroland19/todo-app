import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Button } from "./Button";
import { Modal } from "./Modal";

type TaskItemProps = {
	task: { id: string; title: string; description: string };
	onDelete: () => void;
	onEdit: () => void;
};

export const TaskItem: React.FC<TaskItemProps> = ({
	task,
	onDelete,
	onEdit,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
		useState(false);

	const toggleDescription = () => {
		setIsExpanded((prevState) => !prevState);
	};

	const openDeleteConfirmation = () => {
		setIsDeleteConfirmationOpen(true);
	};

	const closeDeleteConfirmation = () => {
		setIsDeleteConfirmationOpen(false);
	};

	const handleDelete = () => {
		onDelete();
		closeDeleteConfirmation();
	};

	return (
		<div
			className="bg-white shadow-md rounded-lg p-4 flex justify-between items-start hover:shadow-lg transition-shadow duration-300"
			data-testid="task-item"
		>
			<div className="flex-1">
				<h3
					className="text-sm md:text-lg font-semibold text-gray-800"
					data-testid="task-title"
				>
					{task.title}
				</h3>

				<button
					onClick={toggleDescription}
					className="text-blue-500 text-xs md:text-sm hover:text-blue-700 mt-1"
					data-testid="toggle-description-button"
				>
					{isExpanded ? "Hide Details" : "View Details"}
				</button>

				{isExpanded && (
					<p
						className="text-gray-600 text-sm mt-2"
						data-testid="task-description"
					>
						{task.description}
					</p>
				)}
			</div>

			<div className="flex space-x-2">
				<button
					onClick={onEdit}
					className="text-gray-500 hover:text-blue-600 p-1 rounded-full transition duration-200 ease-in-out transform hover:scale-110"
					aria-label="Edit task"
					data-testid="edit-task-button"
				>
					<FaEdit size={16} />
				</button>

				<button
					onClick={openDeleteConfirmation}
					className="text-gray-500 hover:text-red-600 p-1 rounded-full transition duration-200 ease-in-out transform hover:scale-110"
					aria-label="Delete task"
					data-testid="delete-task-button"
				>
					<FaTrash size={16} />
				</button>
			</div>

			{/* Confirmation Modal */}
			<Modal
				isOpen={isDeleteConfirmationOpen}
				onClose={closeDeleteConfirmation}
			>
				<div className="bg-white rounded-lg p-6 shadow-lg">
					<h3 className="text-lg font-semibold text-gray-800">
						Are you sure?
					</h3>
					<p className="text-gray-600 mt-2">
						Do you really want to delete this task? This
						action cannot be undone.
					</p>
					<div className="mt-4 flex justify-end space-x-4">
						<Button
							onClick={closeDeleteConfirmation}
							className="text-gray-500"
						>
							Cancel
						</Button>
						<Button
							onClick={handleDelete}
							className="text-white"
						>
							Delete
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};
