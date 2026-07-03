import { useState, type FormEvent } from "react";
import { createTask } from "../api/tasksApi";
import { translations, type Language } from "../i18n/translations";

import IconButton from "./ui/IconButton";

import createDefault from "../assets/icons/create/create_default.svg";
import createHover from "../assets/icons/create/create_hover.svg";
import createActive from "../assets/icons/create/create_active.svg";

type CreateTaskFormProps = {
    language: Language;
    onTaskCreated: () => void;
};

function CreateTaskForm({ language, onTaskCreated }: CreateTaskFormProps) {
    const t = translations[language];

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errorKey, setErrorKey] = useState<"" | "titleRequired">("");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            setErrorKey("titleRequired");
            return;
        }

        try {
            await createTask({
                title: trimmedTitle,
                description: description.trim(),
            });

            setTitle("");
            setDescription("");
            setErrorKey("");
            onTaskCreated();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>{t.createTaskTitle}</h2>

            <input
                type="text"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);

                    if (errorKey) {
                        setErrorKey("");
                    }
                }}
                placeholder={t.titlePlaceholder}
            />

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.descriptionPlaceholder}
            />

            {errorKey ? <p>{t.errors[errorKey]}</p> : null}

           <IconButton
                type="submit"
                label={t.createTaskButton}
                defaultIcon={createDefault}
                hoverIcon={createHover}
                activeIcon={createActive}
            />
        </form>
    );
}

export default CreateTaskForm;