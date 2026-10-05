import type {Task} from "../TaskType.ts";
import {render, screen} from "@testing-library/react";
import {TaskItem} from "../TaskItem.tsx";

describe('TaskItem', () => {
    it('renders correctly', () => {
        //Arrange
        const task1: Task = {
            id: 1,
            title: "Feed dog",
            description: "on wed morning",
            isComplete: false,
        }

        render(<TaskItem initialTask={task1} />);

        const feedDog = screen.getByRole('listitem', {name: /feed dog/i});

        expect(feedDog).toBeVisible();
        expect(feedDog).toHaveTextContent(task1.description);
        expect(feedDog).toHaveTextContent('inactive');
    });

});