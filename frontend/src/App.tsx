import { useEffect, useState } from "react";
import { deleteTask, getTasks } from "./api/tasksApi";
import type { Task } from "./types/task";
import { translations, type Language } from "./i18n/translations";
import TaskList from "./components/TaskList";
import CreateTaskForm from "./components/CreateTaskForm";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const language: Language = "en";
    const t = translations[language];

    async function loadTasks() {
        try {
            setHasError(false);
            const tasksFromApi = await getTasks();
            setTasks(tasksFromApi);
        } catch (err) {
            setHasError(true);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDeleteTask(id: number) {
        try {
            await deleteTask(id);
            await loadTasks();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        loadTasks();
    }, []);

    let content;

    if (isLoading) {
        content = <p>{t.loadingTasks}</p>;
    } else if (hasError) {
        content = <p>{t.failedToLoadTasks}</p>;
    } else {
        content = (
            <TaskList
                tasks={tasks}
                language={language}
                onDelete={handleDeleteTask}
            />
        );
    }

    return (
        <main>
            <h1>{t.appTitle}</h1>
            <CreateTaskForm language={language} onTaskCreated={loadTasks} />
            {content}
        </main>
    );
}

export default App;