import db from '../db';
import { User } from '../interfaces/IUser';

export class UserRepository {
  async findByLogin(login: string): Promise<User | null> {
    const user = await db<User>('users').where({ login }).first();
    return user || null;
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const [newUser] = await db<User>('users')
      .insert(user)
      .returning('*');
    return newUser;
  }

  async findById(id: string): Promise<User | null> {
    const user = await db<User>('users').where({ id }).first();
    return user || null;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await db<User>('users')
    return users;
  }

}



