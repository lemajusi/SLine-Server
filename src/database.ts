import { Pool } from 'pg';

const pool = new Pool({
    user: 'ui7o4inhdchnbwe1dvsq',
    host: 'bn3lgqkqg589vkeh25nx-postgresql.services.clever-cloud.com',
    database: 'bn3lgqkqg589vkeh25nx',
    password: 'gJc3wmZbYn3dvlZYs4h2',
    port: 5432
});

export default pool;