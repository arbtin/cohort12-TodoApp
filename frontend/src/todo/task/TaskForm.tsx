import React from 'react';
import type {Task} from "./TaskType.ts";

type TaskFormProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export const TaskForm = ({isOpen, onClose, onSuccess}: TaskFormProps) => {
    return (
        <form >

        </form>
    );
};