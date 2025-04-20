"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const express_validator_1 = require("express-validator");
const jwt_1 = require("../utils/jwt");
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
        this.registration = async (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return;
            }
            try {
                console.log('Контроллер вызван');
                const { name, lastname, patronymic, login, password, role } = req.body;
                const assignedRole = role && role.trim() !== '' ? role : 'Пользователь';
                const result = await this.userService.registration({
                    name,
                    lastname,
                    patronymic,
                    login,
                    password,
                    role: assignedRole,
                });
                res.cookie('refreshToken', result.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                res.status(201).json({ token: result.token });
            }
            catch (error) {
                console.error('Ошибка в контроллере регистрации:', error);
                res.status(500).json({ message: error.message });
            }
        };
        this.login = async (req, res) => {
            try {
                const { login, password } = req.body;
                const result = await this.userService.login(login, password);
                res.cookie('refreshToken', result.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                res.status(200).json({ token: result.token });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        };
        this.logout = async (req, res, next) => {
            try {
                res.clearCookie('refreshToken');
                res.status(200).json('Cookies очищены');
            }
            catch (error) {
                res.status(500).json({ message: 'Ошибка при выходе', error: error.message });
            }
        };
        this.refreshToken = async (req, res) => {
            try {
                const tokenFromCookie = req.cookies.refreshToken;
                if (!tokenFromCookie) {
                    res.status(401).json({ message: 'Refresh токен отсутствует' });
                    return;
                }
                const decoded = (0, jwt_1.verifyRefreshToken)(tokenFromCookie);
                const newAccessToken = (0, jwt_1.generateAccessToken)({ id: decoded.id, role: decoded.role });
                const newRefreshToken = (0, jwt_1.generateRefreshToken)({ id: decoded.id, role: decoded.role });
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
            }
            catch (err) {
                res.status(401).json({ message: 'Недействительный refresh токен' });
            }
        };
        this.getAllUsers = async (req, res) => {
            try {
                const response = await this.userService.getAllUsers();
                res.status(200).json(response);
            }
            catch (error) {
                res.status(403).json({ message: 'Ошибка при получении всех Users' });
            }
        };
    }
}
exports.UserController = UserController;
