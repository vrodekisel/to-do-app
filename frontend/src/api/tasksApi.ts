import type { Task } from '../types/task';

const BASE_URL = 'http://localhost:5274/api/tasks';

export async function getTasks(): Promise<Task[]> {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }

    const tasks: Task[] = await response.json();
    return tasks;
}

export type CreateTaskData = {
    title: string;
    description: string;
};

export async function createTask(taskData: CreateTaskData): Promise<Task> {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(taskData),
    });

    if (!response.ok) {
        throw new Error('Failed to create task');
    }

    const createdTask: Task = await response.json();
    return createdTask;
}

export type UpdateTaskData = {
    title: string;
    description: string;
    isCompleted: boolean;
};

export async function updateTask(id : number, taskData: UpdateTaskData): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(taskData),
    });

    if (!response.ok) {
        throw new Error('Failed to update');
    }
}

export async function deleteTask(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
}