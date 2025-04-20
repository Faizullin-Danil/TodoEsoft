import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { validationResult } from 'express-validator';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { console } from 'inspector';
import { AuthRequest } from '../interfaces/IAuthRequest';
import { User } from '../interfaces/IUser';


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
  
      const { name, lastname, patronymic, login, password, role } = req.body;
  
      console.log('Получены параметры:', { name, lastname, patronymic, login, password, role });
  
      const assignedRole = role && role.trim() !== '' ? role : 'Пользователь';
  
      const result = await this.userService.registration({
        name,
        lastname,
        patronymic,
        login,
        password,
        role: assignedRole,
      });
  
      console.log('Результат регистрации:', result);
  
      res.status(201).json(result);
    } catch (error: any) {
      console.error('Ошибка в контроллере регистрации:', error);
      res.status(500).json({ message: error.message });
    }
  };
  
  // В login контроллере
  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { login, password } = req.body;
      
      const result = await this.userService.login(login, password);

      // Устанавливаем refresh токен в httpOnly cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        // secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
      });

      res.status(200).json({ token: result.token }); // только accessToken отправляем в JSON
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  logout = async (req: any, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('refreshToken');
        res.status(200).json('Cookies очищены');
    } catch (e) {
        next(e);
    }
  };

  // В refreshToken контроллере
  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const tokenFromCookie = req.cookies.refreshToken;
      if (!tokenFromCookie) {
        res.status(401).json({ message: 'Refresh токен отсутствует' });
        return;
      }

      const decoded = verifyRefreshToken(tokenFromCookie) as { id: string, role: string };

      const newAccessToken = generateAccessToken({ id: decoded.id, role: decoded.role });
      const newRefreshToken = generateRefreshToken({ id: decoded.id, role: decoded.role });

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        accessToken: newAccessToken,
      });
    } catch (err) {
      res.status(401).json({ message: 'Недействительный refresh токен' });
    }
  };


  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await this.userService.getAllUsers()

      res.status(200).json(response)
    } catch (error) {
      res.status(403).json({ message: 'Ошибка при получении всех Users' });
    }
  }
}
