import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user as Express.Request['user']; // Asegúrate de que el tipo sea correcto
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
