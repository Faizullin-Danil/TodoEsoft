require('dotenv').config();
import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';

interface TokenPayload {
  id: string;
  role: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string): TokenPayload | string => {
  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    if (typeof decoded === 'string') {
      throw new Error('Invalid token format');
    }
    return decoded as TokenPayload; 
  } catch (error) {
    throw new Error('Invalid access token');
  }
};

export const verifyRefreshToken = (token: string): TokenPayload | string => {
  try {
    const decoded = jwt.verify(token, REFRESH_SECRET);
    if (typeof decoded === 'string') {
      throw new Error('Invalid token format');
    }
    return decoded as TokenPayload; 
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};
