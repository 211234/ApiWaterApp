"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("../../application/user.service");
const router = (0, express_1.Router)();
const userService = new user_service_1.UserService();
// Get all users
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userService.getAllUsers();
    res.json(users);
}));
// Get user by id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.getUserById(Number(req.params.id));
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
}));
// Create new user
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.createUser(req.body);
    res.status(201).json(user);
}));
// Update user by id
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.updateUser(Number(req.params.id), req.body);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
}));
// Delete user by id
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const success = yield userService.deleteUser(Number(req.params.id));
    if (success) {
        res.json({ message: 'User deleted successfully' });
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
}));
exports.default = router;
