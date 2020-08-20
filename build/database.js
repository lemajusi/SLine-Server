"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'uphklycrv4jvhvqjjher',
    host: 'bjmmne3jixgqyv36mzsg-postgresql.services.clever-cloud.com',
    database: 'bjmmne3jixgqyv36mzsg',
    password: 'PROJmgQt31Z4auSBaFou',
    port: 5432
});
exports.default = pool;
