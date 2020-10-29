import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    host: 'localhost',
    port: 5432,
    dialect: "postgres",
    database: 'sline',
    username: 'postgres',
    password: 'root'
});
