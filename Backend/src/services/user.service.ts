import bcrypt from 'bcrypt';
import { User } from '../interfaces/IUser';
import { UserRepository } from '../repositories/user.repository';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

export class UserService {
  private userRepository = new UserRepository();

  async registration(data: Omit<User, 'id'>): Promise<{ token: string, refreshToken: string }> {
    
    const existingUser = await this.userRepository.findByLogin(data.login);
    if (existingUser) {
      throw new Error('Пользователь с таким логином уже существует');
    }

    const hashedPassword = await bcrypt.hash(data.password, 5);
    const userWithHashPassword = { ...data, password: hashedPassword };

    const newUser = await this.userRepository.createUser(userWithHashPassword);

    const token = generateAccessToken({ id: newUser.id, role: newUser.role });
    const refreshToken = generateRefreshToken({ id: newUser.id, role: newUser.role });

    return { token, refreshToken };
  }

  async login(login: string, password: string): Promise<{ token: string, refreshToken: string }> {
    const user = await this.userRepository.findByLogin(login);

    if (user === null) {
      throw new Error('Неверный логин или пароль');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Неверный логин или пароль');
    }

    const token = generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id, role: user.role });

    return { token, refreshToken };
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.getAllUsers();
    return users;
  }

}
