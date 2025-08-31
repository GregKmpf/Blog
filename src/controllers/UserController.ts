import { AppDataSource } from '../data-source';
import { User } from '../entity/users';
import { Request, Response } from 'express';

// Lógica para criar um novo usuário
export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    // Verifica se os dados necessários foram enviados
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const userRepository = AppDataSource.getRepository(User);

    // Cria uma nova instância do usuário
    const newUser = userRepository.create({ name, email });

    // Salva o novo usuário no banco de dados
    await userRepository.save(newUser);

    // Retorna o novo usuário com o status 201 (Created)
    return res.status(201).json(newUser);

  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Lógica para listar todos os usuários
export const getUsersController = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();

    return res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
