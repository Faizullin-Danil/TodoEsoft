"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function seed(knex) {
    await knex('users').del();
    const hashedPassword = await bcryptjs_1.default.hash('admin123', 10);
    await knex('users').insert([
        {
            id: 'f7a42f90-2b98-4f4f-97c3-01847df9f6c2',
            name: 'Админ',
            lastname: 'Системный',
            patronymic: 'Администраторович',
            login: 'admin',
            password: hashedPassword,
            role: 'Руководитель'
        },
        {
            id: 'a46b4d11-b1cd-43b1-b063-1c13fd8d4352',
            name: 'Иван',
            lastname: 'Иванов',
            patronymic: 'Иванович',
            login: 'ivanov',
            password: await bcryptjs_1.default.hash('123456', 10),
            role: 'Пользователь'
        },
        {
            id: 'd3b3a50f-3fa0-4e01-b02e-9bc170f5170d',
            name: 'Анна',
            lastname: 'Петрова',
            patronymic: 'Сергеевна',
            login: 'petrova',
            password: await bcryptjs_1.default.hash('123456', 10),
            role: 'Пользователь'
        }
    ]);
}
