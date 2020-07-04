import {Pool} from 'pg';

const pool = new Pool({ host: 'localhost',
user: 'postgres',
password: 'root',
database: 'SLine',
port: 5432});

export default pool