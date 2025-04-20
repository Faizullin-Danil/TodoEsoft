"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('name').notNullable();
        table.string('lastname').notNullable();
        table.string('patronymic');
        table.string('login').notNullable().unique();
        table.string('password').notNullable();
        table.enu('role', ['Пользователь', 'Руководитель']);
    });
}
async function down(knex) {
    return knex.schema.dropTableIfExists('users');
}
