"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'sline',
    port: 5432
});
