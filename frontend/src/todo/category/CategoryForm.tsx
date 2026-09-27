import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {number, string} from "yup";
import {saveCategory} from "./CategoryService.ts";
import type {Category} from "./CategoryType.ts";
import {yupResolver} from "@hookform/resolvers/yup/src";

const validationSchema = Yup.object({
        id: number(),
        label: string().required('Label is required.'),
    }
);

type CategoryFormProps = {
    onSuccess?: () => void;
}

export const CategoryForm = ({onSuccess}: CategoryFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<Category>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (data: Category) => {
        await saveCategory(data);
        reset();
        onSuccess?.();
    }

    return (
        <div className="inset-0 flex items-center justify-center bg-black/50">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-black-700">Create Category</h2>
            </div>

            <form onSubmit={handleSubmit(data => onSubmit(data))} method={'POST'} className="space-y-4">
                <label htmlFor={'Label'} className="block text-sm font-medium text-gray-700">Label</label>
                <input id={'Label'} type={'text'} {...register('label')}
                       className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
                {errors.label && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.label.message}
                    </p>
                )}

                <div className="flex justify-end gap-2 pt-2">
                    <input type={'submit'}
                           value={'Add Category'}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"/>
                </div>
            </form>
        </div>
    );
}
