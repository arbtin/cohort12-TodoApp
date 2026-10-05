<<<<<<< HEAD
import {render, screen, within} from '@testing-library/react';
import {afterEach, expect} from 'vitest';
import {TaskPage} from '../TaskPage.tsx';
import * as taskApi from '../TaskService.ts';
import type {Category} from "../../category/CategoryType.ts";
import {userEvent} from "@testing-library/user-event/dist/cjs/index.js";

vi.mock('../TaskService.ts');

const category: Category = {id: '1', label: 'testing'}
const mockData = [
    {id: 1, title: 'First Task', description: 'get task component built.', category: category},
    {id: 2, title: 'Second Task', description: 'use new task component.', category: category},
];

describe('Task Page', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(taskApi.axiosGetAllTasks).mockResolvedValue(mockData);
    });

    afterEach(() => {
        //restoreAllMocks();
    })

    it('should delete task when delete button is clicked', async () => {
        const task2 = mockData.filter(item => item.id === 2);
        const mockDeleteTask = vi.spyOn(taskApi, 'axiosDeleteTask').mockReturnValue(Promise.resolve());

        render(<TaskPage/>);

        const list = await screen.findByRole('list');

        const firstItem = await within(list).findByLabelText('Task 1');

        const deleteButton = await within(firstItem).findByRole('button', {name: /delete/i});

        expect(deleteButton).toBeInTheDocument();

        await user.click(deleteButton);

        const mockRefreshData = vi.spyOn(taskApi, 'axiosGetAllTasks').mockResolvedValue(task2);

        expect(mockDeleteTask).toHaveBeenCalledOnce();
        expect(mockDeleteTask).toHaveBeenCalledWith(1);
        expect(mockRefreshData).toHaveBeenCalled(2);
    });

    it('should display task heading', async () => {
        render(<TaskPage/>);
        await screen.findByRole('list');

        expect(
            screen.getByRole('heading', {name: /Task List/i}),
        ).toBeInTheDocument();
    });

    it('should show multiple tasks', async () => {
        render(<TaskPage/>);

        // Wait for async data to render
        const list = await screen.findByRole('list');

        const items = within(list).getAllByRole('listitem');

        expect(items).toHaveLength(2);
        expect(items[0]).toHaveTextContent('First Task');
        expect(items[1]).toHaveTextContent('Second Task');
    });

    it('should show multiple tasks and find the first task', async () => {
        render(<TaskPage/>);

        // Wait for async data to render
        const list = await screen.findByRole('list');

        const items = within(list).getAllByRole('listitem');

        expect(items).toHaveLength(2);

        const firstItem = await within(list).findByLabelText('Task 1');
        expect(firstItem).toBeInTheDocument();
    });

});
=======
import {render, screen, within} from "@testing-library/react";
import {TaskPage} from "../TaskPage.tsx";
import type {Task} from "../TaskType.ts";
import * as taskApi from "../TaskApi.ts";
import {userEvent} from "@testing-library/user-event";

const mockListItems: Task[] = [
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

vi.mock('../TaskApi.ts');

describe('TaskPage Items', () => {

    it('should show task page heading', () => {
        render(<TaskPage/>);

        expect(screen.getByRole('heading', {name: /My Tasks/i})).toBeVisible();
    });

    it('should display task items', async () => {
        vi.mocked(taskApi.getAllTasks).mockResolvedValue(mockListItems);
        render(<TaskPage/>);

        const list = await screen.findByRole('list', {name: /list/i});
        expect(list).toBeInTheDocument();

        const items = within(list).getAllByRole('listitem');
        screen.logTestingPlaygroundURL()
        expect(items).toHaveLength(2);
        expect(items[0]).toHaveTextContent('Feed dog');
        expect(items[1]).toHaveTextContent('Walk dog');

    });

    it('should display no tasks found', async () => {
        vi.mocked(taskApi.getAllTasks).mockResolvedValue([]);
        render(<TaskPage/>);

        const list = await screen.findByRole('list', {name: /list/i});
        const items = within(list).getAllByRole('listitem');
        expect(items).toHaveLength(1);
        expect(items[0]).toHaveTextContent('No Tasks Found.');

    });

    it('use queryBy to find no tasks found', async () => {
        vi.mocked(taskApi.getAllTasks).mockResolvedValue([]);
        render(<TaskPage/>);

        const list = await screen.findByRole('list', {name: /list/i});

        const items = within(list).queryByText("no");

        expect(items).not.toHaveTextContent('No Tasks Found.');

    });
})

describe('New Task button', () => {
    const user = userEvent.setup();
    it('should shpw create form when clicked', () => {
        render(<TaskPage/>);

        expect(screen.getByRole('button', {name: /new task/i})).toBeInTheDocument();
    });

    it('should show new task form when clicked', () => {
        render(<TaskPage/>);
        const newTaskButton = screen.getByRole('button', {name: /new task/i});
        userEvent.click(newTaskButton);



    });

});
>>>>>>> d57e3f1 (From Friday Oct 2nd - built task item and page with tests)
