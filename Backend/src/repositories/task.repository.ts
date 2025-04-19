import { UUID } from 'crypto';
import db from '../db';
import { Task } from "../interfaces/ITask";

export class TaskRepository {
    async createTask(task: Omit<Task, 'id'>): Promise<Task> {
      const [newTask] = await db('tasks').insert(task).returning('*');
      return newTask;
    }

    async getAllTasks(): Promise<Task[]> {
      const tasks = await db('tasks')
      .join('users', 'tasks.responsible_id', 'users.id')
      .select(
        'tasks.*',
        'users.name as responsible_name',
        'users.lastname as responsible_lastname',
        'users.patronymic as responsible_patronymic'
      );
      return tasks
    }

    // async getTask(id: UUID): Promise<Task[]> {
    //     const task = await db<Task>('tasks').where({ responsible_id: id });
    //     return task
    // }

    async updateTask(id: number, data: Partial<Task>): Promise<Task> {
      const [updated] = await db<Task>('tasks').where({ id }).update({
        ...data,
        updated_date: new Date(),
      }).returning('*');
      return updated;
    }

    // async deleteTask(taskId: number): Promise<void> {
    //     await db<Task>('tasks').where({ id }).del();
    // }
}
