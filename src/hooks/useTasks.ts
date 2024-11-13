import { useState, useEffect } from 'react';

export type Task = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
};

export const useTasks = () => {
    const loadTasks = () => {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    };

    const [tasks, setTasks] = useState<Task[]>(loadTasks);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (title: string, description: string) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            description,
            completed: false, 
        };
        setTasks((prev) => [...prev, newTask]);
    };

    const updateTask = (id: string, title: string, description: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, title, description } : task
            )
        );
    };

    const removeTask = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const toggleCompletion = (id: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return { tasks, addTask, removeTask, updateTask, toggleCompletion };
};
