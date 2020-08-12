import { Pool } from 'pg';

export default new Pool({ 
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'sline',
    port: 5432
});