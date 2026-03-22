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

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        try {
            await createTask({
                title,
                description,
            });

            setTitle("");
            setDescription("");

            onTaskCreated();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create task</h2>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />

            <button type="submit">Create</button>
        </form>
    );
}

export default CreateTaskForm;