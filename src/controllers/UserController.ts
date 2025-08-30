
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source'; 
import { User } from '../entity/users'; // Verifique o caminho do seu arquivo User

export const createUserController = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: 'Nome e email são obrigatórios' });
        }

        const userRepository = AppDataSource.getRepository(User);

        const newUser = new User();
        newUser.name = name;
        newUser.email = email;

        await userRepository.save(newUser);

        return res.status(201).json(newUser);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};
