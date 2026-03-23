import TaskItem from "./TaskItem";
import type { Task } from "../types/task";
import type { Language } from "../i18n/translations";

type TaskListProps = {
    tasks: Task[];
    language: Language;
    onDelete: (id: number) => void;
    onTaskUpdated: () => void;
};

function TaskList({ tasks, language, onDelete, onTaskUpdated }: TaskListProps) {
    return (
        <ul>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    language={language}
                    onDelete={onDelete}
                    onTaskUpdated={onTaskUpdated}
                />
            ))}
        </ul>
    );
}

export default TaskList;