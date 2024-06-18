// src/user/application/user.service.ts
import jwt from 'jsonwebtoken';
import { UserRepository } from '../infrastructure/adaptadores/user.repository';
import { UserEntity } from '../domain/user.entity';

export class UserService {
    private userRepository = UserRepository;

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async getUserById(id: number): Promise<UserEntity | null> {
        return this.userRepository.findOneBy({ id });
    }

    async createUser(user: UserEntity): Promise<UserEntity> {
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    async updateUser(id: number, user: Partial<UserEntity>): Promise<UserEntity | null> {
        const existingUser = await this.userRepository.findOneBy({ id });
        if (!existingUser) return null;

        this.userRepository.merge(existingUser, user);
        return this.userRepository.save(existingUser);
    }

    async deleteUser(id: number): Promise<boolean> {
        const result = await this.userRepository.delete(id);
        return result.affected !== 0;
    }

    async login(email: string, password: string): Promise<string | null> {
        const user = await this.userRepository.findOneBy({ email });
        if (user && user.password === password) { // Verifica la contraseña (ajusta esto según tu lógica de autenticación)
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
            console.log(`Generated JWT token: ${token}`); // Muestra el token en la consola
            return token;
        }
        return null;
    }
}
