import { UUID } from 'crypto';
import { Task } from '../interfaces/ITask';
import { TaskRepository } from '../repositories/task.repository';

export class TaskService {
    private taskRepository = new TaskRepository();

    async createTask(data: Omit<Task, 'id'>): Promise<Task> {
        const newTask = await this.taskRepository.createTask(data);
        return newTask;
    }

    async getAllTasks(): Promise<Task[]> {
        return this.taskRepository.getAllTasks();
    }
    
    // async getTaskByResponsibleId(id: UUID): Promise<Task[]> {
    //     return this.taskRepository.getTask(id);
    // }

    //   async deleteTask(id: string): Promise<void> {
    //     return this.taskRepository.deleteTask(id);
    //   }
    
    async updateTask(id: number, data: Partial<Task>): Promise<Task> {
        return this.taskRepository.updateTask(id, data);
    }
}
