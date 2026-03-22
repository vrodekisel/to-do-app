import type { Task } from "../types/task";
import { translations, type Language } from "../i18n/translations";
import TaskItem from "./TaskItem";

type TaskListProps = {
    tasks: Task[];
    language: Language;
};

function TaskList({ tasks, language }: TaskListProps) {
    const t = translations[language];

    if (tasks.length === 0) {
        return <p>{t.noTasks}</p>;
    }

    return (
        <ul>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    language={language}
                />
            ))}
        </ul>
    );
}

export default TaskList;