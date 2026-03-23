import { useState } from "react";
import { updateTask } from "../api/tasksApi";
import type { Task } from "../types/task";
import { translations, type Language } from "../i18n/translations";

type TaskItemProps = {
    task: Task;
    language: Language;

    onDelete: (id: number) => void;
    onTaskUpdated?: () => void;
};

function TaskItem({ task, language, onDelete, onTaskUpdated }: TaskItemProps) {
    const t = translations[language];

    const [isCompleted, setIsCompleted] = useState(task.isCompleted);

    async function handleToggleCompleted() {
        const previousValue = isCompleted;
        const nextValue = !isCompleted;
        setIsCompleted(nextValue);

        try {
            await updateTask(task.id, {
                title: task.title,
                description: task.description,
                isCompleted: nextValue,
            });

            onTaskUpdated?.();

        } catch (err) {
            setIsCompleted(previousValue);
            console.error(err);
        }
    }

    return (
        <li>
            <h2>{task.title}</h2>
            <p>{task.description}</p>

            <label>
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={handleToggleCompleted}
                />
                {t.statusLabel}:{" "}
                {isCompleted ? t.statusCompleted : t.statusActive}
            </label>

            <p>{t.createdAtLabel}: {task.createdAt}</p>

            <button onClick={() => onDelete(task.id)}>
                {t.deleteButtonLabel}
            </button>
        </li>
    );
}

export default TaskItem;