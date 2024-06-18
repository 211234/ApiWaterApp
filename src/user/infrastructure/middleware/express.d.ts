import { Request } from 'express';
import { UserEntity } from '../user/domain/user.entity'; // Asegúrate de importar tu entidad de usuario

declare global {
    namespace Express {
        interface Request {
            user?: UserEntity; // Puedes ajustar el tipo de 'user' según tus necesidades
        }
    }
}
