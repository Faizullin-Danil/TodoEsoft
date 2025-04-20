"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jwt_1 = require("../utils/jwt");
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Токен не найден' });
        return;
    }
    try {
        const decoded = (0, jwt_1.verifyAccessToken)(token);
        if (typeof decoded === 'string' || !decoded.id || !decoded.role) {
            res.status(401).json({ message: 'Невалидный токен' });
            return;
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Невалидный токен' });
        return;
    }
};
exports.authenticateToken = authenticateToken;
