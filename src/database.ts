import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const port: any = process.env.DB_PORT;

export const pool = new Pool({
    // connectionString: 'postgresql://upphnvzvzbuhtfajbko2:sVDq4yd2cXdLXfgC8Xwv@blnh5b91ffx6fdsceb49-postgresql.services.clever-cloud.com:5432/blnh5b91ffx6fdsceb49',
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: +port
});