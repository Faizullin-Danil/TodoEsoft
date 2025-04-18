import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../interfaces/IAuthRequest';

export const authorizeRole = (roles: Array<'Пользователь' | 'Руководитель'>) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role as any)) {
      res.status(403).json({ message: 'Доступ запрещен' });
      return
    }
    next();
  };
};
