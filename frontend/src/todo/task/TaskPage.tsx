import {useEffect, useState} from 'react';
<<<<<<< HEAD
import {TaskItem} from './TaskItem.tsx';
import {axiosGetAllTasks, axiosDeleteTask} from './TaskService.ts';
import type {Task} from './TaskType.ts';
=======
import {TaskItem} from "./TaskItem.tsx";
import type {Task} from "./TaskType.ts";
import {getAllTasks} from "./TaskApi.ts";
>>>>>>> d57e3f1 (From Friday Oct 2nd - built task item and page with tests)
import {TaskForm} from "./TaskForm.tsx";

export const TaskPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
<<<<<<< HEAD
    const [isModalOpen, setIsModalOpen] = useState(false);

    const refreshData = async () => {
        try {
            const data = await axiosGetAllTasks();
            setTasks(data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    const handleDelete = (id: number) => {
        axiosDeleteTask(id).then(refreshData);
    }

    useEffect(() => {
        refreshData();
=======
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
>>>>>>> d57e3f1 (From Friday Oct 2nd - built task item and page with tests)
    }, []);

    return (
        <>
<<<<<<< HEAD
            <h2 className={'font-extrabold'}>Task List</h2>
            <ul id={"list"} className={'grid grid-cols-3 gap-4'}>
                {tasks.length > 0 ? (
                    tasks.map((task) => <TaskItem key={task.id} initialTask={task} handleDelete={handleDelete} />)
                ) : (
                    <li>No Tasks found.</li>
                )}
            </ul>
            <button onClick={() => setIsModalOpen(true)}
                    className="rounded-lg bg-blue-500 mx-auto px-4 py-2 my-auto text-sm text-white hover:bg-blue-700">Add
                Task
            </button>

            <TaskForm isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      onSuccess={refreshData}
            />
        </>
    );
};
=======
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
>>>>>>> d57e3f1 (From Friday Oct 2nd - built task item and page with tests)
