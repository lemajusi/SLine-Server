"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    // por url
    connectionString: 'postgresql://ui7o4inhdchnbwe1dvsq:gJc3wmZbYn3dvlZYs4h2@bn3lgqkqg589vkeh25nx-postgresql.services.clever-cloud.com:5432/bn3lgqkqg589vkeh25nx'
    // host web
    // user: 'ui7o4inhdchnbwe1dvsq',
    // host: 'bn3lgqkqg589vkeh25nx-postgresql.services.clever-cloud.com',
    // database: 'bn3lgqkqg589vkeh25nx',
    // password: 'gJc3wmZbYn3dvlZYs4h2',
    // port: 5432,
    // local:
    // user: 'postgres',
    // host: 'localhost',
    // database: 'sline',
    // password: 'root',
});
