import { connectionPool } from '.';
import { PoolClient } from 'pg';

export async function findAllRequestByStatusID(statusid: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        await client.query(`set schema 'Heroes';`);
        const query = `SELECT * FROM requests WHERE status = $1;`;
        const res = await client.query(query, [statusid]);
        return res.rows;
    } catch (err) {
        console.log(err);
        return err;
    } finally {
        client && client.release();
    }
}

export async function findAllRequestByUserID(userid: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        await client.query(`set schema 'Heroes';`);
        const query = `SELECT * FROM requests WHERE author = $1;`;
        const res = await client.query(query, [userid]);
        return res.rows;
    } catch (err) {
        console.log(err);
        return err;
    } finally {
        client && client.release();
    }
}