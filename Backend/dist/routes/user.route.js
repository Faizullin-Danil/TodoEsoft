"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const express_validator_1 = require("express-validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
router.post('/registration', [
    (0, express_validator_1.body)('name', 'Имя не может быть пустым').notEmpty(),
    (0, express_validator_1.body)('lastname', 'Фамилия не может быть пустой').notEmpty(),
    (0, express_validator_1.body)('login', 'Логин должен быть от 5 символов').isLength({ min: 5 }),
    (0, express_validator_1.body)('password', 'Пароль должен быть от 6 символов').isLength({ min: 6 }),
], userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/refresh-token', userController.refreshToken);
router.get('/users', auth_middleware_1.authenticateToken, userController.getAllUsers);
exports.default = router;
