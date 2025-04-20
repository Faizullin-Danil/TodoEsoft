"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const db_1 = __importDefault(require("../db"));
class TaskRepository {
    async createTask(task) {
        const [newTask] = await (0, db_1.default)('tasks').insert(task).returning('*');
        return newTask;
    }
    async getAllTasks() {
        const tasks = await (0, db_1.default)('tasks')
            .join('users', 'tasks.responsible_id', 'users.id')
            .select('tasks.*', 'users.name as responsible_name', 'users.lastname as responsible_lastname', 'users.patronymic as responsible_patronymic');
        return tasks;
    }
    async updateTask(id, data) {
        const [updated] = await (0, db_1.default)('tasks').where({ id }).update({
            ...data,
            updated_date: new Date(),
        }).returning('*');
        return updated;
    }
}
exports.TaskRepository = TaskRepository;
