"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const task_repository_1 = require("../repositories/task.repository");
class TaskService {
    constructor() {
        this.taskRepository = new task_repository_1.TaskRepository();
    }
    async createTask(data) {
        const newTask = await this.taskRepository.createTask(data);
        return newTask;
    }
    async getAllTasks() {
        return this.taskRepository.getAllTasks();
    }
    async updateTask(id, data) {
        return this.taskRepository.updateTask(parseInt(id), data);
    }
}
exports.TaskService = TaskService;
