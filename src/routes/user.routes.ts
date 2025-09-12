// src/routes/user.routes.ts
import { Router } from 'express';
import { createUserController } from '../controllers/UserController';

const userRoutes = Router();

userRoutes.post('/users', createUserController);
//  adicionar outras rotas como GET, PUT, DELETE para usuários

export default userRoutes;

/* 

usa o express para lidar com diferente requisiçoes 

*/