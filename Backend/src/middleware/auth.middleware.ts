import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { AuthRequest } from '../interfaces/IAuthRequest';

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Токен не найден' });
    return
  }

  try {
    const decoded = verifyAccessToken(token);
    if (typeof decoded === 'string' || !decoded.id || !decoded.role) {
      res.status(403).json({ message: 'Невалидный токен' });
      return
    }

    req.user = decoded;  
    next();  
  } catch (error) {
    res.status(403).json({ message: 'Невалидный токен' });
    return
  }
};
