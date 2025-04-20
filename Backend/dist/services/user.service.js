"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt = require('bcryptjs');
const user_repository_1 = require("../repositories/user.repository");
const jwt_1 = require("../utils/jwt");
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    async registration(data) {
        const existingUser = await this.userRepository.findByLogin(data.login);
        if (existingUser) {
            throw new Error('Пользователь с таким логином уже существует');
        }
        const hashedPassword = await bcrypt.hash(data.password, 5);
        const userWithHashPassword = { ...data, password: hashedPassword };
        const newUser = await this.userRepository.createUser(userWithHashPassword);
        const token = (0, jwt_1.generateAccessToken)({ id: newUser.id, role: newUser.role });
        const refreshToken = (0, jwt_1.generateRefreshToken)({ id: newUser.id, role: newUser.role });
        return { token, refreshToken };
    }
    async login(login, password) {
        const user = await this.userRepository.findByLogin(login);
        if (user === null) {
            throw new Error('Неверный логин или пароль');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Неверный логин или пароль');
        }
        const token = (0, jwt_1.generateAccessToken)({ id: user.id, role: user.role });
        const refreshToken = (0, jwt_1.generateRefreshToken)({ id: user.id, role: user.role });
        return { token, refreshToken };
    }
    async getAllUsers() {
        const users = await this.userRepository.getAllUsers();
        return users;
    }
}
exports.UserService = UserService;
