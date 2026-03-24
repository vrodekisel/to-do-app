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

        const formattedCreatedAt = new Date(task.createdAt).toLocaleString(
        language === "ru" ? "ru-RU" : "en-US",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );

    const [isCompleted, setIsCompleted] = useState(task.isCompleted);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);

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

    function handleStartEditing() {
        setEditedTitle(task.title);
        setEditedDescription(task.description);
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setEditedTitle(task.title);
        setEditedDescription(task.description);
        setIsEditing(false);
    }

    async function handleSaveEditing() {
        if (!editedTitle.trim()) {
            return;
        }

        try {
            await updateTask(task.id, {
                title: editedTitle.trim(),
                description: editedDescription.trim(),
                isCompleted: isCompleted,
            });

            setIsEditing(false);
            onTaskUpdated?.();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <li>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(event) => setEditedTitle(event.target.value)}
                        placeholder="Task title"
                    />

                    <textarea
                        value={editedDescription}
                        onChange={(event) => setEditedDescription(event.target.value)}
                        placeholder="Task description"
                    />

                    <button
                        type="button"
                        onClick={handleSaveEditing}
                        title="Save"
                        aria-label="Save"
                    >
                        💾
                    </button>

                    <button
                        type="button"
                        onClick={handleCancelEditing}
                        title="Cancel"
                        aria-label="Cancel"
                    >
                        ✖
                    </button>
                </>
            ) : (
                <>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>

                    <button
                        type="button"
                        onClick={handleStartEditing}
                        title="Edit"
                        aria-label="Edit"
                    >
                        ✏️
                    </button>
                </>
            )}

            <label>
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={handleToggleCompleted}
                />
                {t.statusLabel}:{" "}
                {isCompleted ? t.statusCompleted : t.statusActive}
            </label>

            <p>{t.createdAtLabel}: {formattedCreatedAt}</p>

            <button onClick={() => onDelete(task.id)}>
                {t.deleteButtonLabel}
            </button>
        </li>
    );
}

export default TaskItem;