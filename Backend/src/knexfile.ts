import type { Knex } from "knex";
require('dotenv').config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
            host: process.env.DB_HOST || 'db',
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_DATABASE || 'todo',
        },
        migrations: {
            directory: './migrations',
            tableName: 'knex_migrations',
        },
  },
};

export default config;
