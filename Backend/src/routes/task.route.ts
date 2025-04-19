import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { authorizeRole } from '../middleware/role.middleware';

const router = Router();
const taskController = new TaskController();


router.get('/tasks', authenticateToken, taskController.getAllTasks);
router.post('/tasks', authenticateToken, taskController.createTask);
// router.get('/tasks/responsible/:id', authenticateToken, taskController.getTasksByResponsibleId);
// router.delete('/tasks/:id', authenticateToken, taskController.deleteTask);
router.put('/tasks/:id', authenticateToken, taskController.updateTask);

export default router;
