import { Pool } from 'pg';

const config = {
    user: process.env['HEROES_DB_USERNAME'],
    host: process.env['HEROES_DB_URL'] || 'localhost',
    database: process.env['HEROES_DB_NAME'] || 'postgres',
    password: process.env['HEROES_DB_PASSWORD'],
    port: +process.env['DB_PORT'] || 5432,
    max: 5
};

console.log(config);

export const connectionPool = new Pool(config);