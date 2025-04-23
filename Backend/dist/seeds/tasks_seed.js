"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
async function seed(knex) {
    await knex("tasks").del();
    await knex("tasks").insert([
        {
            id: '1',
            title: "Подготовить отчёт",
            description: "Собрать данные за месяц и оформить в таблице.",
            due_date: new Date("2025-05-10"),
            created_date: new Date(),
            updated_date: new Date(),
            priority: "высокий",
            status: "к выполнению",
            creator_id: 'f7a42f90-2b98-4f4f-97c3-01847df9f6c2',
            responsible_id: 'd3b3a50f-3fa0-4e01-b02e-9bc170f5170d'
        },
        {
            id: '2',
            title: "Обновить сайт",
            description: "Добавить новую секцию с отзывами.",
            due_date: new Date("2025-05-20"),
            created_date: new Date(),
            updated_date: new Date(),
            priority: "средний",
            status: "выполняется",
            creator_id: 'f7a42f90-2b98-4f4f-97c3-01847df9f6c2',
            responsible_id: 'a46b4d11-b1cd-43b1-b063-1c13fd8d4352'
        },
        {
            id: '3',
            title: "Проверить документацию",
            description: "Убедиться, что все документы подписаны.",
            due_date: new Date("2025-04-30"),
            created_date: new Date(),
            updated_date: new Date(),
            priority: "низкий",
            status: "отменена",
            creator_id: 'f7a42f90-2b98-4f4f-97c3-01847df9f6c2',
            responsible_id: 'a46b4d11-b1cd-43b1-b063-1c13fd8d4352'
        }
    ]);
}
