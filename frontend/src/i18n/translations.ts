export type Language = "ru" | "en";

export type TranslationSchema = {
    appTitle: string;
    loadingTasks: string;
    noTasks: string;
    statusLabel: string;
    statusCompleted: string;
    statusActive: string;
    createdAtLabel: string;
    failedToLoadTasks: string;
    languageSwitcherRu: string;
    languageSwitcherEn: string;
    deleteButtonLabel: string;

    authTitle: string;
    usernamePlaceholder: string;
    passwordPlaceholder: string;
    repeatPasswordPlaceholder: string;
    loginButton: string;
    registerButton: string;
    logoutButton: string;
    switchToLoginButton: string;
    switchToRegisterButton: string;

    createTaskTitle: string;
    titlePlaceholder: string;
    descriptionPlaceholder: string;
    createTaskButton: string;

    editTitlePlaceholder: string;
    editDescriptionPlaceholder: string;
    editTaskButtonLabel: string;
    saveTaskButtonLabel: string;
    cancelEditButtonLabel: string;

    errors: {
        failedToFetchTasks: string;
        failedToCreateTask: string;
        failedToUpdateTask: string;
        failedToDeleteTask: string;
        invalidToken: string;
        failedToRegister: string;
        failedToLogin: string;

        usernameAlreadyExists: string;
        usernameIsRequired: string;
        passwordIsRequired: string;
        passwordTooShort: string;
        passwordsDoNotMatch: string;
        passwordMustContainLettersAndDigits: string;
        invalidUsernameOrPassword: string;
        TitleRequired: string;
    };
};

export const translations: Record<Language, TranslationSchema> = {
    ru: {
        appTitle: "to-do app",
        loadingTasks: "Загрузка задач...",
        noTasks: "Задач пока нет",
        statusLabel: "Статус",
        statusCompleted: "Выполнено",
        statusActive: "Активна",
        createdAtLabel: "Создано",
        failedToLoadTasks: "Не удалось загрузить задачи",
        languageSwitcherRu: "RU",
        languageSwitcherEn: "EN",
        deleteButtonLabel: "Удалить",

        authTitle: "Авторизация",
        usernamePlaceholder: "Имя пользователя",
        passwordPlaceholder: "Пароль",
        repeatPasswordPlaceholder: "Повторите пароль",
        loginButton: "Войти",
        registerButton: "Зарегистрироваться",
        logoutButton: "Выйти",
        switchToLoginButton: "У меня уже есть аккаунт",
        switchToRegisterButton: "У меня ещё нет аккаунта",

        createTaskTitle: "Создать задачу",
        titlePlaceholder: "Название",
        descriptionPlaceholder: "Описание",
        createTaskButton: "Создать",

        editTitlePlaceholder: "Название задачи",
        editDescriptionPlaceholder: "Описание задачи",
        editTaskButtonLabel: "Редактировать",
        saveTaskButtonLabel: "Сохранить",
        cancelEditButtonLabel: "Отмена",

        errors: {
            failedToFetchTasks: "Не удалось получить задачи",
            failedToCreateTask: "Не удалось создать задачу",
            failedToUpdateTask: "Не удалось обновить задачу",
            failedToDeleteTask: "Не удалось удалить задачу",
            invalidToken: "Неверный или просроченный токен",
            failedToRegister: "Не удалось зарегистрироваться",
            failedToLogin: "Неверный логин или пароль",

            usernameAlreadyExists: "Пользователь с таким именем уже существует",
            usernameIsRequired: "Введите имя пользователя",
            passwordIsRequired: "Введите пароль",
            passwordTooShort: "Пароль должен содержать минимум 8 символов",
            passwordsDoNotMatch: "Пароли не совпадают",
            passwordMustContainLettersAndDigits: "Пароль должен содержать буквы и цифры",
            invalidUsernameOrPassword: "Неверное имя пользователя или пароль",
            TitleRequired: "Введите заголовок",
        },
    },

    en: {
        appTitle: "to-do app",
        loadingTasks: "Loading tasks...",
        noTasks: "No tasks yet",
        statusLabel: "Status",
        statusCompleted: "Completed",
        statusActive: "Active",
        createdAtLabel: "Created at",
        failedToLoadTasks: "Failed to load tasks",
        languageSwitcherRu: "RU",
        languageSwitcherEn: "EN",
        deleteButtonLabel: "Delete",

        authTitle: "Authorization",
        usernamePlaceholder: "Username",
        passwordPlaceholder: "Password",
        repeatPasswordPlaceholder: "Repeat password",
        loginButton: "Login",
        registerButton: "Register",
        logoutButton: "Logout",
        switchToLoginButton: "I already have an account",
        switchToRegisterButton: "I don't have an account yet",

        createTaskTitle: "Create task",
        titlePlaceholder: "Title",
        descriptionPlaceholder: "Description",
        createTaskButton: "Create",

        editTitlePlaceholder: "Task title",
        editDescriptionPlaceholder: "Task description",
        editTaskButtonLabel: "Edit",
        saveTaskButtonLabel: "Save",
        cancelEditButtonLabel: "Cancel",

        errors: {
            failedToFetchTasks: "Failed to fetch tasks",
            failedToCreateTask: "Failed to create task",
            failedToUpdateTask: "Failed to update task",
            failedToDeleteTask: "Failed to delete task",
            invalidToken: "Invalid or expired token",
            failedToRegister: "Failed to register",
            failedToLogin: "Invalid username or password",

            usernameAlreadyExists: "A user with this username already exists",
            usernameIsRequired: "Username is required",
            passwordIsRequired: "Password is required",
            passwordTooShort: "Password must be at least 8 characters long",
            passwordsDoNotMatch: "Passwords do not match",
            passwordMustContainLettersAndDigits: "Password must contain letters and digits",
            invalidUsernameOrPassword: "Invalid username or password",
            TitleRequired: "Title is required",
        },
    },
};