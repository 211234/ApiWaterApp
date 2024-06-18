import { AppDataSource } from '../../../database/ormconfig';
import { UserEntity } from '../../domain/user.entity';

export const UserRepository = AppDataSource.getRepository(UserEntity);
