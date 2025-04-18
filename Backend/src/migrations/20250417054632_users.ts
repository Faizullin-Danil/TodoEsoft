import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');

    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('name').notNullable();
        table.string('lastname').notNullable();
        table.string('patronymic');
        table.string('login').notNullable().unique()
        table.string('password').notNullable()
        table.enu('role', ['Пользователь', 'Руководитель'])
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users')

}

