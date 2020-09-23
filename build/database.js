"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    // connectionString: 'postgresql://upphnvzvzbuhtfajbko2:sVDq4yd2cXdLXfgC8Xwv@blnh5b91ffx6fdsceb49-postgresql.services.clever-cloud.com:5432/blnh5b91ffx6fdsceb49',
    user: 'postgres',
    host: 'localhost',
    password: 'root',
    database: 'sline',
    port: 5432
});
