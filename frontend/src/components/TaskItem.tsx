import type { Task } from "../types/task";
import { translations, type Language } from "../i18n/translations";

type TaskItemProps = {
    task: Task;
    language : Language;
};

function TaskItem({ task, language }: TaskItemProps) {
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
        </li>
    );
}

export default TaskItem;