const BASE_URL = "http://localhost:5274/api/auth";

export type RegisterUserData = {
    username: string;
    password: string;
    repeatPassword: string;
};

export type LoginUserData = {
    username: string;
    password: string;
};

export type AuthResponse = {
    username: string;
    token: string;
};

function saveAuthData(authData: AuthResponse) {
    localStorage.setItem("token", authData.token);
    localStorage.setItem("username", authData.username);
}

export async function registerUser(userData: RegisterUserData): Promise<{ username: string }> {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.error ?? "errors.failedToRegister");
    }

    return responseData;
}

export async function loginUser(userData: LoginUserData): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.error ?? "errors.failedToLogin");
    }

    saveAuthData(responseData);

    return responseData;
}

export function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
}

export function isUserAuthenticated(): boolean {
    return !!localStorage.getItem("token");
}

export function getCurrentUsername(): string | null {
    return localStorage.getItem("username");
}