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
exports.UserService = void 0;
const user_repository_1 = require("../infrastructure/adaptadores/user.repository");
class UserService {
    constructor() {
        this.userRepository = user_repository_1.UserRepository;
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find();
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOneBy({ id });
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = this.userRepository.create(user);
            return this.userRepository.save(newUser);
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepository.findOneBy({ id });
            if (!existingUser)
                return null;
            this.userRepository.merge(existingUser, user);
            return this.userRepository.save(existingUser);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userRepository.delete(id);
            return result.affected !== 0;
        });
    }
}
exports.UserService = UserService;
