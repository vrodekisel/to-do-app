export type Language = 'ru' | 'en';

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
};

export const translations: Record<Language, TranslationSchema> = {
    ru: {
        appTitle: 'to-do app',
        loadingTasks: 'Загрузка задач...',
        noTasks: 'Задач пока нет',
        statusLabel: 'Статус',
        statusCompleted: 'Выполнено',
        statusActive: 'Активна',
        createdAtLabel: 'Создано',
        failedToLoadTasks: 'Не удалось загрузить задачи',
        languageSwitcherRu: 'RU',
        languageSwitcherEn: 'EN',
    },
    en: {
        appTitle: 'to-do app',
        loadingTasks: 'Loading tasks...',
        noTasks: 'No tasks yet',
        statusLabel: 'Status',
        statusCompleted: 'Completed',
        statusActive: 'Active',
        createdAtLabel: 'Created at',
        failedToLoadTasks: 'Failed to load tasks',
        languageSwitcherRu: 'RU',
        languageSwitcherEn: 'EN',
    },
};