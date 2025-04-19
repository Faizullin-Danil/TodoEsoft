import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { body } from 'express-validator';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
const userController = new UserController();

router.post(
  '/registration',
  [
    body('name', 'Имя не может быть пустым').notEmpty(),
    body('lastname', 'Фамилия не может быть пустой').notEmpty(),
    body('login', 'Логин должен быть от 5 символов').isLength({ min: 5 }),
    body('password', 'Пароль должен быть от 6 символов').isLength({ min: 6 }),
  ],
  userController.registration
);

router.post('/login', userController.login);
router.post('/refresh-token', userController.refreshToken); 

router.get('/users', authenticateToken, userController.getAllUsers)

export default router;
