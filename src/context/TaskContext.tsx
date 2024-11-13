import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export type Task = {
	id: string;
	title: string;
	description: string;
	completed: boolean;
};

interface TaskContextProps {
	tasks: Task[];
	addTask: (title: string, description: string) => void;
	removeTask: (id: string) => void;
	updateTask: (id: string, title: string, description: string) => void;
	toggleCompletion: (id: string) => void;
}
const baseUrl = "http://localhost:5000/tasks";

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const useTaskContext = () => {
	const context = useContext(TaskContext);
	if (!context) {
		throw new Error("useTaskContext must be used within a TaskProvider");
	}
	return context;
};

export const TaskProvider: React.FC = ({ children }: any) => {
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		axios.get(`${baseUrl}`)
			.then((response) => setTasks(response.data))
			.catch((error) => {
				console.error("Error fetching tasks:", error);
				setTasks([]);
			});
	}, []);

	const addTask = (title: string, description: string) => {
		const newTask: Task = {
			id: crypto.randomUUID(),
			title,
			description,
			completed: false,
		};
		axios.post(`${baseUrl}`, newTask)
			.then((response) => setTasks((prev) => [...prev, response.data]))
			.catch((error) => console.error("Error adding task:", error));
	};

	const removeTask = (id: string) => {
		axios.delete(`${baseUrl}/${id}`)
			.then(() =>
				setTasks((prev) => prev.filter((task) => task.id !== id))
			)
			.catch((error) => console.error("Error removing task:", error));
	};

	const updateTask = (id: string, title: string, description: string) => {
		axios.put(`${baseUrl}/${id}`, { title, description })
			.then((response) => {
				setTasks((prevTasks) =>
					prevTasks.map((task) =>
						task.id === id
							? { ...task, ...response.data }
							: task
					)
				);
			})
			.catch((error) => console.error("Error updating task:", error));
	};

	const toggleCompletion = (id: string) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === id
					? { ...task, completed: !task.completed }
					: task
			)
		);
	};

	return (
		<TaskContext.Provider
			value={{
				tasks,
				addTask,
				removeTask,
				updateTask,
				toggleCompletion,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};
