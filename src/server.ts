import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import { AppDataSource } from './data-source';
import userRoutes from './routes/user.routes';

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

// Cria a instância do seu aplicativo Express.js
const app = express();

// Middleware para processar requisições JSON.
// Esta linha deve vir ANTES das suas rotas.
app.use(express.json()); 

// Adicione as rotas da sua aplicação
app.use(userRoutes);

async function start() {
  try {
    await AppDataSource.initialize();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Falha ao iniciar a aplicação:', err);
    process.exit(1);
  }
}

start();
