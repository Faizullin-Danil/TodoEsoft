import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../interfaces/IAuthRequest';

export class TaskController {
  private taskService = new TaskService();

  createTask = async (req: AuthRequest, res: Response): Promise<void> => {
    const errors = validationResult(req);
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
    } catch (error: any) {
      res.status(500).json({ message: 'Ошибка при создании задачи', error: error.message });
    }
  };

  getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(500).json({ message: 'Ошибка при получении задач', error: error.message });
    }
  };

  updateTask = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
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
    } catch (error: any) {
      res.status(500).json({ message: 'Ошибка при обновлении задачи', error: error.message });
    }
  };
}
