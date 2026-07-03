import { useState } from "react";
import { updateTask } from "../api/tasksApi";
import type { Task } from "../types/task";
import { translations, type Language } from "../i18n/translations";
import IconButton from "./ui/IconButton";

import editDefault from "../assets/icons/edit/edit_default.svg";
import editHover from "../assets/icons/edit/edit_hover.svg";
import editActive from "../assets/icons/edit/edit_active.svg";

import saveDefault from "../assets/icons/save/save_default.svg";
import saveHover from "../assets/icons/save/save_hover.svg";
import saveActive from "../assets/icons/save/save_active.svg";

import cancelDefault from "../assets/icons/cancel/cancel_default.svg";
import cancelHover from "../assets/icons/cancel/cancel_hover.svg";
import cancelActive from "../assets/icons/cancel/cancel_active.svg";

import deleteDefault from "../assets/icons/delete/delete_default.svg";
import deleteHover from "../assets/icons/delete/delete_hover.svg";
import deleteActive from "../assets/icons/delete/delete_active.svg";

import checkboxUnchecked from "../assets/icons/checkbox/checkbox_unchecked.svg";
import checkboxHover from "../assets/icons/checkbox/checkbox_hover.svg";
import checkboxChecked from "../assets/icons/checkbox/checkbox_checked.svg";

type TaskItemProps = {
    task: Task;
    language: Language;
    onDelete: (id: number) => void;
    onTaskUpdated?: () => void;
};

function TaskItem({
    task,
    language,
    onDelete,
    onTaskUpdated,
}: TaskItemProps) {
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
    const [editedDescription, setEditedDescription] = useState(
        task.description
    );

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
                isCompleted,
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
                        onChange={(event) =>
                            setEditedTitle(event.target.value)
                        }
                        placeholder={t.editTitlePlaceholder}
                    />

                    <textarea
                        value={editedDescription}
                        onChange={(event) =>
                            setEditedDescription(event.target.value)
                        }
                        placeholder={t.editDescriptionPlaceholder}
                    />

                    <IconButton
                        label={t.saveTaskButtonLabel}
                        defaultIcon={saveDefault}
                        hoverIcon={saveHover}
                        activeIcon={saveActive}
                        onClick={handleSaveEditing}
                    />

                    <IconButton
                        label={t.cancelEditButtonLabel}
                        defaultIcon={cancelDefault}
                        hoverIcon={cancelHover}
                        activeIcon={cancelActive}
                        onClick={handleCancelEditing}
                    />
                </>
            ) : (
                <>
                    <h2>{task.title}</h2>

                    <p>{task.description}</p>

                    <IconButton
                        label={t.editTaskButtonLabel}
                        defaultIcon={editDefault}
                        hoverIcon={editHover}
                        activeIcon={editActive}
                        onClick={handleStartEditing}
                    />
                </>
            )}

            <label className="retro-checkbox">
                <input
                    className="retro-checkbox__input"
                    type="checkbox"
                    checked={isCompleted}
                    onChange={handleToggleCompleted}
                />

                <span className="retro-checkbox__visual">
                    <img
                        className="retro-checkbox__image retro-checkbox__image--unchecked"
                        src={checkboxUnchecked}
                        alt=""
                    />

                    <img
                        className="retro-checkbox__image retro-checkbox__image--hover"
                        src={checkboxHover}
                        alt=""
                    />

                    <img
                        className="retro-checkbox__image retro-checkbox__image--checked"
                        src={checkboxChecked}
                        alt=""
                    />
                </span>

                <span>
                    {t.statusLabel}:{" "}
                    {isCompleted ? t.statusCompleted : t.statusActive}
                </span>
            </label>

            <p>
                {t.createdAtLabel}: {formattedCreatedAt}
            </p>

            <IconButton
                label={t.deleteButtonLabel}
                defaultIcon={deleteDefault}
                hoverIcon={deleteHover}
                activeIcon={deleteActive}
                onClick={() => onDelete(task.id)}
            />
        </li>
    );
}

export default TaskItem;