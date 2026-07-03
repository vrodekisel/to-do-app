import { useState, type FormEvent } from "react";
import { createTask } from "../api/tasksApi";
import { translations, type Language } from "../i18n/translations";

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

            <button type="submit">
                {t.createTaskButton}
            </button>
        </form>
    );
}

export default CreateTaskForm;