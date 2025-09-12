// src/entity/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

}
//fala para o typeORM como deve ser tratado como user deve ser representado em uma table
//typeorm -> usar código typescript invez de sql diretamente