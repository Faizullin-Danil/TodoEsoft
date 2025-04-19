import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/task.service';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../interfaces/IAuthRequest';
import { Task } from '../interfaces/ITask';

export class TaskController {
  private taskService = new TaskService();

    createTask = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        // Проверяем, если есть ошибки валидации
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        try {
            const { title, description, due_date, priority, status, responsible_id } = req.body;

            const creator_id = req.user?.id;  // Получаем id создателя из токена

            if (!creator_id) {
            res.status(400).json({ message: 'Не удалось найти ID создателя' });
            return;
            }

            // Создаем задачу
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

            res.status(201).json(task); // Возвращаем созданную задачу
        } catch (error) {
            next(error); // Обрабатываем ошибку
        }
    }

    getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tasks = await this.taskService.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            next(error);
        }
    };

  // Получить задачу по responsible_id
    // getTaskByResponsibleId = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const { id } = req.params;
    //         const tasks = await this.taskService.getTaskByResponsibleId(id);
    //         res.status(200).json(tasks);
    //     } catch (error) {
    //         next(error);
    //     }
    // };

  // Удалить задачу по id
    // deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const { id } = req.params;
    //         await this.taskService.deleteTask(id);
    //         res.status(200).json({ message: 'Задача удалена' });
    //     } catch (error) {
    //         next(error);
    //     }
    // };

  // Обновить задачу
    // TaskController.ts

    updateTask = async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        try {
            const { id } = req.params
            const { title, description, priority, due_date, status, responsible_id} = req.body;

            const updatedTask = await this.taskService.updateTask(id, {
                title,
                description,
                due_date,
                priority,
                status: status,
                responsible_id,
                created_date: new Date(),
                updated_date: new Date(),
            });

            res.status(200).json(updatedTask);
        } catch (error) {
            next(error);
        }
    }

}
