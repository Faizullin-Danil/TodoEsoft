import knex from 'knex';
import config from './knexfile';
import express from 'express';
const cors = require('cors');
require('dotenv').config();
import userRoutes from './routes/user.route'
import userTasks from './routes/task.route'

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(express.json());

const db = knex(config.development);

app.use('/api', userRoutes);
app.use('/api', userTasks)

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
