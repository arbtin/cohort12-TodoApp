import {http, HttpResponse} from 'msw';
import {setupServer} from 'msw/node';
import {beforeAll, expect} from 'vitest';
import {axiosDeleteTask, axiosGetAllTasks, axiosSaveTask, getAllTasks} from '../TaskService.ts';
import type {Task} from '../TaskType.ts';
import type {Category} from "../../category/CategoryType.ts";

describe('Task Service', () => {
    //axios.defaults.baseURL = "http://localhost:8080";

    const server = setupServer();
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => server.resetHandlers());

    it('should get all tasks', async () => {
        const expected: Task[] = [
            {id: 1, title: 'First Task', description: 'get task component built.'},
            {id: 2, title: 'Second Task', description: 'use new task component.'},
        ];

        server.use(
            http.get('/api/v1/task', () =>
                HttpResponse.json(expected, {status: 200}),
            ),
        );

        expect(await axiosGetAllTasks()).toStrictEqual(expected);
        expect(await getAllTasks()).toStrictEqual(expected);
    });

    it('should save a new task', async () => {
        const newTask: Task = {title: 'Feed dog', description: 'Please feed the dog'};

        server.use(
            http.post('/api/v1/task', () =>
                HttpResponse.json(newTask, {status: 201}),
            ),
        );

        expect(await axiosSaveTask()).toStrictEqual(newTask);

    });

    it('should delete task item', async () => {
        const category: Category = {id: 1, label: "active"};
        const deleteTask: Task = {id: 1, title: 'Delete this task', description: 'This task will be deleted', category: category};

        server.use(
            http.delete('/api/v1/task/1', () =>
                HttpResponse.json(deleteTask, {status: 204}),
            ),
        );

        await expect(axiosDeleteTask(deleteTask.id)).resolves.toMatchObject({});

    });
});
