import {render, screen, within} from "@testing-library/react";
import {TaskPage} from "../TaskPage.tsx";
import type {Task} from "../TaskType.ts";
import * as taskApi from "../TaskApi.ts";
import {userEvent} from "@testing-library/user-event";
import {expect} from "vitest";

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
