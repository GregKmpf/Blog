import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/users';
import "dotenv/config";

// Verifica se as variáveis de ambiente necessárias estão definidas.
if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
    throw new Error("Missing one or more required environment variables for database connection. Please check your .env file.");
}

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // Use apenas em desenvolvimento!
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});
