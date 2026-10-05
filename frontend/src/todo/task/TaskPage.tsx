import {useEffect, useState} from 'react';
import {TaskItem} from "./TaskItem.tsx";
import type {Task} from "./TaskType.ts";
import {getAllTasks} from "./TaskApi.ts";
import {TaskForm} from "./TaskForm.tsx";

export const TaskPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const [openTaskForm, setOpenTaskForm] = useState(false);

    const refreshTasks = async () => {
        try {
            const response = await getAllTasks();
            setTasks(response);
        } catch (error) {
            console.error("Failed to get tasks:", error);
        }
    };

    useEffect(() => {
        refreshTasks();
    }, []);

    return (
        <>
        <h2 className="h-1">My Tasks</h2>
        <ul className="m-3 space-y-3 rounded-xl bg-white p-10 text-sm/7 text-gray-700 dark:bg-gray-950 dark:text-gray-300" aria-label="list">
            {tasks.length > 0 ? (
            tasks.map((task) => <TaskItem key={task.id} initialTask={task}/>)) : (
                <li>No Tasks Found.</li>
            )}
        </ul>
            <button onClick={() => setOpenTaskForm(true)} className="">New Task</button>
            <TaskForm isOpen={openTaskForm}
                      onClose={() => setOpenTaskForm(false)}
            onSuccess={refreshTasks}/>
        </>
    );
};
