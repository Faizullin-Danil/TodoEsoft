export interface Task {
    id: number;
    title: string;
    description: string;
    due_date: Date;
    created_date: Date;
    updated_date: Date;
    priority: 'высокий' | 'средний' | 'низкий' | string;
    status: 'к выполнению' | 'выполняется' | 'выполнена' | 'отменена';
    creator_id: string;
    responsible_id: string;
    responsible_lastname: string;
    responsible_name: string;
    responsible_patronymic: string;
}
