import { Request, Response, Router } from 'express';
import { UserService } from '../../application/user.service';
import { UserEntity } from '../../domain/user.entity';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();
const userService = new UserService();

// Get all users
router.get('/getAll', authenticateJWT, async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.json(users);
});

// Get user by id
router.get('/user/:id', authenticateJWT, async (req: Request, res: Response) => {
    const user = await userService.getUserById(Number(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Register new user
router.post('/register', async (req: Request, res: Response) => {
    const { fullName, street, email, password, confirmPassword } = req.body;

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Las contraseñas no coinciden.' });
    }

    // Crear el usuario
    const user = await userService.createUser({ fullName, street, email, password } as UserEntity);
    res.status(201).json(user);
});

// Login user
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await userService.login(email, password);

    if (token) {
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
});

// Update user by id
router.put('/actualizar/:id', authenticateJWT, async (req: Request, res: Response) => {
    const user = await userService.updateUser(Number(req.params.id), req.body);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Delete user by id
router.delete('/eliminar/:id', authenticateJWT, async (req: Request, res: Response) => {
    const success = await userService.deleteUser(Number(req.params.id));
    if (success) {
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

export default router;
