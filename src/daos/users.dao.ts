import { connectionPool } from '.';
import { PoolClient } from 'pg';
import User from '../classes/users';

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
        console.log(`attempting to connect to server...`);
        client = await connectionPool.connect();
        console.log(`connected...`);
        await client.query(`set schema 'Heroes';`);
        const query = `SELECT * FROM users WHERE heroname = $1 AND password = $2;`;
        console.log(`searching for user...`);
        const res = await client.query(query, [username, password]);
        console.log(`search returned...`);
        return res.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
}

export async function updateUser(user: User) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        await client.query(`set schema 'Heroes';`);
        let res: any;
        if (user.heroname != undefined) {
            const query = `UPDATE users SET heroname = $1 WHERE userid = $2;`;
            res = await client.query(query, [user.heroname, user.userid]);
        }
        if (user.password != undefined) {
            const query = `UPDATE users SET password = $1 WHERE userid = $2;`;
            res = await client.query(query, [user.password, user.userid]);
        }
        if (user.firstname != undefined) {
            const query = `UPDATE users SET firstname = $1 WHERE userid = $2;`;
            res = await client.query(query, [user.firstname, user.userid]);
        }
        if (user.lastname != undefined) {
            const query = `UPDATE users SET lastname = $1 WHERE userid = $2;`;
            res = await client.query(query, [user.lastname, user.userid]);
        }
        if (user.email != undefined) {
            const query = `UPDATE users SET email = $1 WHERE userid = $2;`;
            res = await client.query(query, [user.email, user.userid]);
        }
        const query = `SELECT * FROM users WHERE userid = $1;`;
        res = await client.query(query, [user.userid]);
        return res.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
}