import React, { useState } from "react";
import { useTaskContext } from "./context/TaskContext";
import { useModal } from "./hooks/useModal";
import { Button, Modal, Navbar, TaskForm, TaskItem } from "./components";
import { IoMdClose } from "react-icons/io";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

const App: React.FC = () => {
	const { tasks, addTask, removeTask, updateTask, toggleCompletion } =
		useTaskContext();

	const [currentPage, setCurrentPage] = useState(1);
	const tasksPerPage = 4;

	const [filter, setFilter] = useState<"all" | "completed" | "pending">(
		"all"
	);

	const filteredTasks = tasks.filter((task) => {
		if (filter === "completed") return task.completed;
		if (filter === "pending") return !task.completed;
		return true;
	});

	const indexOfLastTask = currentPage * tasksPerPage;
	const indexOfFirstTask = indexOfLastTask - tasksPerPage;
	const currentTasks = filteredTasks.slice(
		indexOfFirstTask,
		indexOfLastTask
	);

	const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

	const [isModalOpen, openModal, closeModal] = useModal();
	const [editingTask, setEditingTask] = useState<{
		id: string;
		title: string;
		description: string;
	} | null>(null);

	const handleEdit = (task: {
		id: string;
		title: string;
		description: string;
	}) => {
		setEditingTask(task);
		openModal();
	};

	const handleFormSubmit = (title: string, description: string) => {
		if (editingTask) {
			updateTask(editingTask.id, title, description);
		} else {
			addTask(title, description);
		}
		setEditingTask(null);
		closeModal();
	};

	const handleToggleCompletion = (id: string) => {
		toggleCompletion(id);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleFilterChange = (filter: "all" | "completed" | "pending") => {
		setFilter(filter);
		setCurrentPage(1);
	};

	return (
		<div className="w-full h-full">
			<Navbar onClick={openModal} />
			<div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-200 p-6 flex flex-col items-center">
				<div className="mt-8 w-full max-w-lg space-y-4">
					<div className="flex space-x-1 justify-center md:space-x-4 mb-4">
						<Button onClick={() => handleFilterChange("all")}>
							All
						</Button>
						<Button
							onClick={() =>
								handleFilterChange("completed")
							}
						>
							Completed
						</Button>
						<Button
							onClick={() => handleFilterChange("pending")}
						>
							Pending
						</Button>
					</div>

					{currentTasks.length > 0 ? (
						currentTasks.map((task) => (
							<div
								key={task.id}
								className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
							>
								<div className="flex items-center justify-between">
									<div
										onClick={() =>
											handleToggleCompletion(
												task.id
											)
										}
										className="cursor-pointer"
									>
										{task.completed ? (
											<FaCheckCircle
												size={24}
												className="text-green-500"
											/>
										) : (
											<FaCircle
												size={24}
												className="text-gray-400"
											/>
										)}
									</div>

									<div
										className={`flex-1 ml-4 ${
											task.completed
												? "line-through text-gray-900"
												: ""
										}`}
									>
										<TaskItem
											task={task}
											onDelete={() =>
												removeTask(task.id)
											}
											onEdit={() =>
												handleEdit(task)
											}
										/>
									</div>
								</div>
							</div>
						))
					) : (
						<p className="text-gray-600 text-center text-sm md:text-lg">
							No tasks added yet!
						</p>
					)}

					<div className="flex justify-center mt-4 space-x-4">
						<Button
							disabled={currentPage === 1}
							onClick={() =>
								handlePageChange(currentPage - 1)
							}
						>
							Previous
						</Button>
						<span className="text-xs md:text-sm font-medium">
							Page {currentPage} of {totalPages}
						</span>
						<Button
							disabled={currentPage === totalPages}
							onClick={() =>
								handlePageChange(currentPage + 1)
							}
						>
							Next
						</Button>
					</div>
				</div>

				<Modal
					isOpen={isModalOpen}
					onClose={closeModal}
				>
					<div className="cursor-pointer w-full flex justify-end items-end">
						<IoMdClose onClick={closeModal} />
					</div>
					<div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
						<TaskForm
							onSubmit={handleFormSubmit}
							initialTitle={editingTask?.title}
							initialDescription={editingTask?.description}
							buttonText={
								editingTask ? "Update Task" : "Add Task"
							}
						/>
					</div>
				</Modal>
			</div>
		</div>
	);
};

export default App;
