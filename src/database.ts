import { Pool } from 'pg';

export let pool = new Pool({ 
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'sline',
    port: 5432
});