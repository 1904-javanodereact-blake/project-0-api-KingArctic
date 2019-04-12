import { connectionPool } from '.';
import { PoolClient } from 'pg';

export async function findAllUsers() {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        await client.query(`set schema 'Heroes';`);
        const res = await client.query('SELECT * FROM users ORDER BY userid ASC;');
        return res.rows;
    } catch (err) {
        return err;
    } finally {
        client && client.release();
    }
}

export async function findUserByID(userid: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        await client.query(`set schema 'Heroes';`);
        const query = `SELECT * FROM users WHERE userid = $1;`;
        const res = await client.query(query, [userid]);
        return res.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
}

export async function findUserByUsernameAndPassword(username: string, password: string) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        await client.query(`set schema 'Heroes';`);
        const query = `SELECT * FROM users WHERE heroname = $1 AND password = $2;`;
        const res = await client.query(query, [username, password]);
        return res.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
}

// export async function updateUser(user) {
//     let client: PoolClient;
//     try {
//         client = await connectionPool.connect();
//         await client.query(`set schema 'Heroes';`);
//         const query = `SELECT * FROM users WHERE heroname = $1 AND password = $2;`;
//         const res = await client.query(query, [username, password]);
//         return res.rows[0];
//     } catch (err) {
//         console.log(err);
//     } finally {
//         client && client.release();
//     }
// }