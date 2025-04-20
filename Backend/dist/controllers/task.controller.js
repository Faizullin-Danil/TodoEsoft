"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("../services/task.service");
const express_validator_1 = require("express-validator");
class TaskController {
    constructor() {
        this.taskService = new task_service_1.TaskService();
        this.createTask = async (req, res) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }
            try {
                const { title, description, due_date, priority, responsible_id } = req.body;
                const creator_id = req.user?.id;
                if (!creator_id) {
                    res.status(400).json({ message: 'Не удалось найти ID создателя' });
                    return;
                }
                const task = await this.taskService.createTask({
                    title,
                    description,
                    due_date,
                    priority,
                    status: 'к выполнению',
                    creator_id,
                    responsible_id,
                    created_date: new Date(),
                    updated_date: new Date(),
                });
                res.status(201).json(task);
            }
            catch (error) {
                res.status(500).json({ message: 'Ошибка при создании задачи', error: error.message });
            }
        };
        this.getAllTasks = async (req, res) => {
            try {
                const tasks = await this.taskService.getAllTasks();
                res.status(200).json(tasks);
            }
            catch (error) {
                res.status(500).json({ message: 'Ошибка при получении задач', error: error.message });
            }
        };
        this.updateTask = async (req, res) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }
            try {
                const { id } = req.params;
                const { title, description, priority, due_date, status, responsible_id } = req.body;
                const updatedTask = await this.taskService.updateTask(id, {
                    title,
                    description,
                    due_date,
                    priority,
                    status,
                    responsible_id,
                    created_date: new Date(),
                    updated_date: new Date(),
                });
                res.status(200).json(updatedTask);
            }
            catch (error) {
                res.status(500).json({ message: 'Ошибка при обновлении задачи', error: error.message });
            }
        };
    }
}
exports.TaskController = TaskController;
