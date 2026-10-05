import type {Task} from "./TaskType.ts";

type getTasks = () => Promise<Task[]>;
type addTask = (task: Task) => Promise<Task>;

export const getAllTasks: getTasks = async () => {
    return fetch('/api/v1/task', {method: 'GET'}).then(response => response.json());
}

export const saveNewTask: addTask = (task: Task) => {
    return fetch('/api/v1/task', {method: 'POST', body: JSON.stringify(task)}).then(response => response.json());
}
