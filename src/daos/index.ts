import { Pool } from 'pg';

export const connectionPool = new Pool({
    user: process.env['HEROES_DB_USERNAME'],
    host: process.env['HEROES_DB_URL'] || 'localhost',
    database: process.env['HEROES_DB_NAME'] || 'postgres',
    password: process.env['HEROES_DB_PASSWORD'],
    port: 5432,
    max: 5
});