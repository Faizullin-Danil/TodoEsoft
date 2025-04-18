export interface User {
    id: string;
    name: string;
    lastname: string;
    patronymic?: string;
    login: string;
    password: string;
    role: 'Пользователь' | 'Руководитель';
}
  