import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { validationResult } from 'express-validator';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { console } from 'inspector';

export class UserController {
  private userService = new UserService();

  registration = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
  
    try {
      console.log('Контроллер вызван');
  
      const { name, lastname, patronymic, login, password } = req.body;
  
      // Логируем, что параметры успешно получены
      console.log('Получены параметры:', { name, lastname, patronymic, login, password });
  
      const result = await this.userService.registration({
        name,
        lastname,
        patronymic,
        login,
        password,
        role: 'Пользователь',
      });
  
      console.log('Результат регистрации:', result);
  
      res.status(201).json(result);
    } catch (error: any) {
      console.error('Ошибка в контроллере регистрации:', error);
      res.status(500).json({ message: error.message });
    }
  };
  

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { login, password } = req.body;
      
      const result = await this.userService.login(login, password);
      
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ message: 'Вы вышли из системы' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      // Проверка наличия refresh токена в заголовке
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Refresh токен отсутствует' });
        return
      }

      const refreshToken = authHeader.split(' ')[1];

      const decoded = verifyRefreshToken(refreshToken) as { id: string, role: string };

      const newAccessToken = generateAccessToken({ id: decoded.id, role: decoded.role });

      const newRefreshToken = generateRefreshToken({ id: decoded.id, role: decoded.role });

      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      });
    } catch (err) {
      res.status(403).json({ message: 'Недействительный refresh токен' });
    }
  };
}
