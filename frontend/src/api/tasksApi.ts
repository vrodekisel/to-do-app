import type { Task } from "../types/task";

const BASE_URL = "http://localhost:5274/api/tasks";

function getAuthToken(): string | null {
    return localStorage.getItem("token");
}

function getAuthHeaders() {
    const token = getAuthToken();

    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}

export type CreateTaskData = {
    title: string;
    description: string;
};

export type UpdateTaskData = {
    title: string;
    description: string;
    isCompleted: boolean;
};

export async function getTasks(): Promise<Task[]> {
    const response = await fetch(BASE_URL, {
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("errors.failedToFetchTasks");
    }

    return response.json();
}

export async function createTask(taskData: CreateTaskData): Promise<Task> {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData),
    });

    if (!response.ok) {
        throw new Error("errors.failedToCreateTask");
    }

    return response.json();
}

export async function updateTask(id: number, taskData: UpdateTaskData): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData),
    });

    if (!response.ok) {
        throw new Error("errors.failedToUpdateTask");
    }
}

export async function deleteTask(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("errors.failedToDeleteTask");
    }
}