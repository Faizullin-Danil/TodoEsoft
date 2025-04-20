"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const db_1 = __importDefault(require("../db"));
class UserRepository {
    async findByLogin(login) {
        const user = await (0, db_1.default)('users').where({ login }).first();
        return user || null;
    }
    async createUser(user) {
        const [newUser] = await (0, db_1.default)('users')
            .insert(user)
            .returning('*');
        return newUser;
    }
    async findById(id) {
        const user = await (0, db_1.default)('users').where({ id }).first();
        return user || null;
    }
    async getAllUsers() {
        const users = await (0, db_1.default)('users');
        return users;
    }
}
exports.UserRepository = UserRepository;
