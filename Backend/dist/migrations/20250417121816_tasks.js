"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('tasks', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.timestamp('due_date').notNullable();
        table.timestamp('created_date').notNullable();
        table.timestamp('updated_date').notNullable();
        table.enu('priority', ['высокий', 'средний', 'низкий']).notNullable();
        table.enu('status', ['к выполнению', 'выполняется', 'выполнена', 'отменена']).notNullable();
        table.uuid('creator_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.uuid('responsible_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    });
}
async function down(knex) {
    return knex.schema.dropTableIfExists('tasks');
}
