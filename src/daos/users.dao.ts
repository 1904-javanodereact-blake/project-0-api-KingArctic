import { connectionPool } from '.';
import { PoolClient } from 'pg';
import User from '../classes/users';

export async function findAllUsers() {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        await client.query(`set schema 'Heroes';`);
        const res = await client.query(`SELECT users.userid, users.heroname, users.password, users.firstname, users.lastname, users.email, ur.rolename as role, users.imageurl
        FROM users
        LEFT JOIN userroles ur
        ON users.roleid = ur.roleid
        ORDER BY users.userid;`);
        return res.rows;
    } catch (err) {
        console.log(err);
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
        const query = `SELECT users.userid, users.heroname, users.password, users.firstname, users.lastname, users.email, ur.rolename as role, users.imageurl
        FROM users
        LEFT JOIN userroles ur
        ON users.roleid = ur.roleid
        WHERE users.userid = $1
        ORDER BY users.userid;`;
        const res = await client.query(query, [userid]);
        return res.rows;
    } catch (err) {
        console.log(err);
        return err;
    } finally {
        client && client.release();
    }
}

export async function findUserByName(username: string) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        await client.query(`set schema 'Heroes';`);
        let query = `SELECT users.userid, users.heroname, users.password, users.firstname, users.lastname, users.email, ur.rolename as role, users.imageurl
        FROM users
        LEFT JOIN userroles ur
        ON users.roleid = ur.roleid
        WHERE concat(users.firstname, ' ', users.lastname) = $1
        ORDER BY users.userid;`;
        let res = await client.query(query, [username]);
        if (res.rows.length === 0) {
            query = `SELECT users.userid, users.heroname, users.password, users.firstname, users.lastname, users.email, ur.rolename as role, users.imageurl
        FROM users
        LEFT JOIN userroles ur
        ON users.roleid = ur.roleid
        WHERE users.firstname = $1
        ORDER BY users.userid;`;
            res = await client.query(query, [username]);
            if (res.rows.length === 0) {
                query = `SELECT users.userid, users.heroname, users.password, users.firstname, users.lastname, users.email, ur.rolename as role, users.imageurl
            FROM users
            LEFT JOIN userroles ur
            ON users.roleid = ur.roleid
            WHERE users.lastname = $1
            ORDER BY users.userid;`;
                res = await client.query(query, [username]);
            }
        }
        return res.rows;
    } catch (err) {
        console.log(err);
        return err;
    } finally {
        client && client.release();
    }
}

export async function findUserByHeroName(username: string) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        await client.query(`set schema 'Heroes';`);
        const query = `SELECT users.userid, users.heroname, users.password, users.firstname, users.lastname, users.email, ur.rolename as role, users.imageurl
        FROM users
        LEFT JOIN userroles ur
        ON users.roleid = ur.roleid
        WHERE users.heroname = $1
        ORDER BY users.userid;`;
        const res = await client.query(query, [username]);
        return res.rows;
    } catch (err) {
        console.log(err);
        return err;
    } finally {
        client && client.release();
    }
}

export async function findUserByUsernameAndPassword(username: string, password: string) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        await client.query(`set schema 'Heroes';`);
        const query = `SELECT users.userid, users.heroname, users.password, users.firstname, users.lastname, users.email, ur.rolename as role, users.imageurl
        FROM users
        LEFT JOIN userroles ur
        ON users.roleid = ur.roleid
        WHERE users.heroname = $1 AND users.password = $2
        ORDER BY users.userid;`;
        const res = await client.query(query, [username, password]);
        return res.rows[0];
    } catch (err) {
        console.log(err);
        return err;
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
        if (user.roleid != undefined) {
            const query = `UPDATE users SET roleid = $1 WHERE userid = $2;`;
            res = await client.query(query, [user.roleid, user.userid]);
        }
        if (user.imageurl != undefined) {
            const query = `UPDATE users SET imageurl = $1 WHERE userid = $2;`;
            res = await client.query(query, [user.imageurl, user.userid]);
        }
        const query = `SELECT * FROM users WHERE userid = $1;`;
        res = await client.query(query, [user.userid]);
        return res.rows;
    } catch (err) {
        console.log(err);
        return err;
    } finally {
        client && client.release();
    }
}