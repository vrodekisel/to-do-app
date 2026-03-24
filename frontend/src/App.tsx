import { useEffect, useState } from "react";
import { deleteTask, getTasks } from "./api/tasksApi";
import { loginUser, logoutUser, getCurrentUsername, registerUser } from "./api/authApi";
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
    const [repeatPassword, setRepeatPassword] = useState("");
    const [authError, setAuthError] = useState<string | null>(null);

    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    const language: Language = "en";
    const t = translations[language];

    function getLocalizedError(errorKey: string) {
        if (errorKey.startsWith("errors.")) {
            const key = errorKey.replace("errors.", "") as keyof typeof t.errors;
            return t.errors[key] ?? errorKey;
        }

        return errorKey;
    }

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

    async function handleRegister() {
        try {
            setAuthError(null);

            await registerUser({
                username,
                password,
                repeatPassword,
            });

            await handleLogin();
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
                        placeholder={t.usernamePlaceholder}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        placeholder={t.passwordPlaceholder}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {isRegisterMode && (
                        <input
                            placeholder={t.repeatPasswordPlaceholder}
                            type="password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                    )}

                    {isRegisterMode ? (
                        <button onClick={handleRegister}>
                            {t.registerButton}
                        </button>
                    ) : (
                        <button onClick={handleLogin}>
                            {t.loginButton}
                        </button>
                    )}

                    <button onClick={() => setIsRegisterMode(!isRegisterMode)}>
                        {isRegisterMode
                            ? t.switchToLoginButton
                            : t.switchToRegisterButton}
                    </button>
                </div>

                {authError && <p>{getLocalizedError(authError)}</p>}
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
                <button onClick={handleLogout}>{t.logoutButton}</button>
            </div>

            <CreateTaskForm language={language} onTaskCreated={loadTasks} />

            {content}
        </main>
    );
}

export default App;