<<<<<<< HEAD
import type {Task} from './TaskType.ts';

type TaskItemProps = {
    initialTask: Task;
    handleDelete: (id: number) => void;
};

const categoryBorderMap: Record<string, string> = {
    active: 'border-blue-500',
    closed: 'border-red-500',
    delayed: 'border-red-500',
    Default: 'border-gray-300',
};

export const TaskItem = ({initialTask, handleDelete}: TaskItemProps) => {
    const borderColor =
        categoryBorderMap[initialTask.category.label] ||
        categoryBorderMap.Default;

    return (
        <li
            className={`${borderColor} p-1 card border-l-14`}
            aria-label={`Task ${initialTask.id}`}
            id={initialTask.id}
        >
            <b>{initialTask.title}</b><br/> {initialTask.description}
            <div className={`rounded-pill text-xs px-2 py-1 ${borderColor}`}>{initialTask.category.label}</div>
            <input type={'button'} value={'Delete'} className={'rounded-full border-2 border-red-500'} onClick={() => handleDelete(initialTask.id)} />
        </li>
    );
};
=======
import type {Task} from "./TaskType.ts";

type TaskItemProps = {
    initialTask: Task;
};

export const TaskItem = ({initialTask}: TaskItemProps) => {
    return <li id={`${initialTask.id}`} className="flex" aria-label={initialTask.title}>
        <svg className="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" stroke-linecap="square">
            <circle cx="11" cy="11" r="11" className="fill-sky-400/25"/>
            <circle cx="11" cy="11" r="10.5" className="stroke-sky-400/25"/>
            <path d="M8 11.5L10.5 14L14 8" className="stroke-sky-800 dark:stroke-sky-300"/>
        </svg>
        <p className="ml-3">{initialTask.title}:</p>
        <p className="ml-3">{initialTask.description}</p>
        <p className="ml-3">{initialTask.isComplete ? 'active' : 'inactive'}</p>
    </li>
}
>>>>>>> d57e3f1 (From Friday Oct 2nd - built task item and page with tests)
