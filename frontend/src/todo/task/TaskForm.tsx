import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {number, string} from "yup";
import {axiosSaveTask} from "./TaskService.ts";
import {getAllCategories} from "../category/CategoryService.ts";
import type {Task} from "./TaskType.ts";
import {yupResolver} from "@hookform/resolvers/yup/src";
import {useEffect, useState} from "react";
import type {Category} from "../category/CategoryType.ts";

const validationSchema = Yup.object({
        id: number(),
        title: string().required('Title is required.'),
        description: string().required('Description is required.'),
    }
);

type TaskFormProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export const TaskForm = ({isOpen, onClose, onSuccess}: TaskFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<Task>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {
        if(!isOpen) {
            reset();
        }
        getCategories();
    }, [isOpen]);

    const onSubmit = async (data: Task) => {
        await axiosSaveTask(data);
        reset();
        onSuccess?.();
        onClose();
    }

    const [categories, setCategories] = useState<Category[]>([]);

    const getCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div
                aria-label="Close modal"
                className="absolute inset-0 z-0"
                onClick={onClose}
            />
            <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
                 onClick={(e) => e.stopPropagation()}>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-black-700">Create Task</h2>
                    <button
                        type={'button'}
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label='Close'
                    >X
                    </button>
                </div>

                <form onSubmit={handleSubmit(data => onSubmit(data))} method={'POST'} className="space-y-4">
                    <label htmlFor={'Title'} className="block text-sm font-medium text-gray-700">Title</label>
                    <input id={'Title'} type={'text'} {...register('title')}
                           className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.title.message}
                        </p>
                    )}

                    <label htmlFor={'Description'}
                           className="block text-sm font-medium text-gray-700">Description</label>
                    <input id={'Description'} type={'text'} {...register('description')}
                           className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.description.message}
                        </p>
                    )}

                    <select {...register('category.id')}>
                        {categories.length > 0 ? (
                            categories.map((category) => <option
                                key={category.id}
                                value={category.id}
                            >{category.label}</option>)
                        ) : (
                            <option value={"0"}>No Categories found.</option>
                        )}
                    </select>


                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            onClick={onClose}
                            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
                        >Cancel
                        </button>
                        <button
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
