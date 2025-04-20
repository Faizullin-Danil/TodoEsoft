import express from 'express';
import knex from 'knex';
import config from './knexfile';
import userRoutes from './routes/user.route';
import taskRoutes from './routes/task.route';
import cookieParser from 'cookie-parser';
const cors = require('cors');
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Подключение к базе данных
const db = knex(config.development);

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // укажи фронт, если он на Vite, или свой порт
  credentials: true               // обязательно для отправки httpOnly cookies
}));
app.use(express.json());

// Роуты
app.use('/api', userRoutes);
app.use('/api', taskRoutes);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
