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

const db = knex(config.development);

app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', taskRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
