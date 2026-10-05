import {setupServer} from "msw/node";
import type {Task} from "../TaskType.ts";
import {http, HttpResponse} from "msw";
import {getAllTasks, saveNewTask} from "../TaskApi.ts";

describe('TaskApi', () => {

    const server = setupServer();
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => server.restoreHandlers());

    it('Should return an array of tasks', async () => {
        const expected: Task[] = [
            {
                id: 1,
                title: "Feed dog",
                description: "on wed morning",
                isComplete: false,
            },
            {
                id: 2,
                title: "Walk dog",
                description: "on tue afternoon",
                isComplete: true,
            }
        ];

        server.use(
            http.get('/api/v1/task', () =>  HttpResponse.json(expected, {status: 200}),),
        );

        expect(await getAllTasks()).toStrictEqual(expected);
    });

    it('Should save a new task', async () => {
        const newTask: Task = {
            id: 1,
            title: "Feed dog",
            description: "on wed morning",
            isComplete: false,
        };

        server.use(
            http.post('/api/v1/task', () =>  HttpResponse.json(newTask, {status: 200}),),
        )

        expect(await saveNewTask()).toStrictEqual(newTask);

    });
})