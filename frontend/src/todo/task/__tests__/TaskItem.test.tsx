<<<<<<< HEAD
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { TaskItem } from '../TaskItem.tsx';
import type { Task } from '../TaskType.ts';
import type {Category} from "../../category/CategoryType.ts";

describe('Task Item', () => {
  it('should display single task item', () => {
    const category: Category = {id:'1', label:'testing'}
    const task1: Task = {
      id: 1,
      title: 'First Task',
      description: 'get task component built.',
      category: category,
    };
    // Arrange
    render(<TaskItem initialTask={task1} />);

    expect(screen.getByRole('listitem', { name: /task/i })).toBeInTheDocument();
    expect(
      screen.getByText('First Task', { exact: false }),
    ).toBeInTheDocument();
  });

  it('should display delete button ', () => {
    const category: Category = {id:'1', label:'testing'}
    const task1: Task = {
      id: 1,
      title: 'First Task',
      description: 'get task component built.',
      category: category,
    };
    render(<TaskItem initialTask={task1} />);

    expect(screen.getByRole('button', {name: /delete/i})).toBeInTheDocument();

  });
});
=======
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
>>>>>>> d57e3f1 (From Friday Oct 2nd - built task item and page with tests)
