import type { Task } from "../types/task";
import { translations, type Language } from "../i18n/translations";

type TaskItemProps = {
    task: Task;
    language: Language;
    onDelete: (id: number) => void;
};

function TaskItem({ task, language, onDelete }: TaskItemProps) {
    const t = translations[language];

    return (
        <li>
            <h2>{task.title}</h2>
            <p>{task.description}</p>

            <p>
                {t.statusLabel}:{" "}
                {task.isCompleted ? t.statusCompleted : t.statusActive}
            </p>

            <p>{t.createdAtLabel}: {task.createdAt}</p>

            <button onClick={() => onDelete(task.id)}>
                {t.deleteButtonLabel}
            </button>
        </li>
    );
}

export default TaskItem;