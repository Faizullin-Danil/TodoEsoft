import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/role.middleware';

const router = Router();
const taskController = new TaskController();

router.post(
  '/tasks',
  authenticateToken,
  authorizeRole(['Пользователь', 'Руководитель']),
  taskController.createTask
);

router.get('/tasks', authenticateToken, taskController.getAllTasks);
// router.get('/tasks/responsible/:id', authenticateToken, taskController.getTasksByResponsibleId);
// router.delete('/tasks/:id', authenticateToken, taskController.deleteTask);
router.put('/tasks/:id', authenticateToken, taskController.updateTask);

export default router;
