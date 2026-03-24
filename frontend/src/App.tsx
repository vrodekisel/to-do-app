import { useEffect, useState } from "react";
import { deleteTask, getTasks } from "./api/tasksApi";
import { loginUser, logoutUser, getCurrentUsername } from "./api/authApi";
import type { Task } from "./types/task";
import { translations, type Language } from "./i18n/translations";
import TaskList from "./components/TaskList";
import CreateTaskForm from "./components/CreateTaskForm";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState<string | null>(null);

    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

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

    async function handleLogin() {
        try {
            setAuthError(null);

            await loginUser({
                username,
                password,
            });

            setIsAuthenticated(true);
            setIsLoading(true);

            await loadTasks();
        } catch (err: any) {
            setAuthError(err.message);
        }
    }

    function handleLogout() {
        logoutUser();
        setIsAuthenticated(false);
        setTasks([]);
    }

    useEffect(() => {
        if (isAuthenticated) {
            loadTasks();
        } else {
            setIsLoading(false);
        }
    }, []);

    if (!isAuthenticated) {
        return (
            <main>
                <h1>{t.appTitle}</h1>

                <div>
                    <input
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        placeholder="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>login</button>
                </div>

                {authError && <p>{authError}</p>}
            </main>
        );
    }

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
                onTaskUpdated={loadTasks}
            />
        );
    }

    return (
        <main>
            <h1>{t.appTitle}</h1>

            <div>
                <span>{getCurrentUsername()}</span>
                <button onClick={handleLogout}>logout</button>
            </div>

            <CreateTaskForm language={language} onTaskCreated={loadTasks} />

            {content}
        </main>
    );
}

export default App;