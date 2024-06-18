import { UserEntity } from './user.entity';

export interface UserRepository {
    getAllUsers(): Promise<UserEntity[]>;
    getUserById(id: number): Promise<UserEntity | null>;
    createUser(user: UserEntity): Promise<UserEntity>;
    updateUser(id: number, user: Partial<UserEntity>): Promise<UserEntity | null>;
    deleteUser(id: number): Promise<boolean>;
}
