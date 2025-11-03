// src/routes/user.routes.ts
import { Router } from 'express';
import { createUserController, getUsersController } from '../controllers/UserController';

const userRoutes = Router();

userRoutes.post('/users', createUserController);
userRoutes.get('/users', getUsersController);

export default userRoutes;