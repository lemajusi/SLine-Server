"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'ui7o4inhdchnbwe1dvsq',
    host: 'bn3lgqkqg589vkeh25nx-postgresql.services.clever-cloud.com',
    database: 'bn3lgqkqg589vkeh25nx',
    password: 'gJc3wmZbYn3dvlZYs4h2',
    port: 5432
});
exports.default = pool;
