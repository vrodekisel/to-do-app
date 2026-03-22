import { useEffect, useState } from "react";
import { getTasks } from "./api/tasksApi";
import type { Task } from './types/task';
import { translations, type Language } from "./i18n/translations";

function App(){
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    
    const language: Language = "en";
    const t = translations[language];

    useEffect(() => {
        async function loadTasks() {
            try {
                setHasError(false);
                const tasksFromApi = await getTasks();
                setTasks(tasksFromApi);
            }
            catch (err) {
                setHasError(true);
                console.error(err);
            }
            finally {
                setIsLoading(false);
            }
        }

        loadTasks();
    }, []);


    let content;
    
    if (isLoading) {
        content = <p>{t.loadingTasks}</p>;
    } else if (hasError) {
        content = <p>{t.failedToLoadTasks}</p>;
    } else if (tasks.length === 0) {
        content = <p>{t.noTasks}</p>;
    } else {
        content = (
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <p>
                            {t.statusLabel}:{" "}
                            {task.isCompleted ? t.statusCompleted : t.statusActive}
                        </p>
                        <p>{t.createdAtLabel}: {task.createdAt}</p>
                    </li>
                ))}
            </ul>
        );
    }
    return (
        <main>
            <h1>{t.appTitle}</h1>
            {content}
        </main>
    );
}

export default App;