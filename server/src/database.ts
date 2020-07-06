import {Pool} from 'pg';

const pool = new Pool({ host: 'localhost',
user: 'postgres',
password: 'root',
database: 'sline',
port: 5432});

export default pool