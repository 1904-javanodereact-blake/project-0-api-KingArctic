import { connectionPool } from '.';
import { PoolClient } from 'pg';
import Request from '../classes/request';

export async function findAllRequests() {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        await client.query(`set schema 'Heroes';`);
        const query = `SELECT * FROM requests;`;
        const res = await client.query(query);
        return res.rows;
    } catch (err) {
        console.log(err);
        return err;
    } finally {
        client && client.release();
    }
}

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

export async function findAllRequestByUserID(userId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        await client.query(`set schema 'Heroes';`);
        const query = `SELECT * FROM requests WHERE author = $1;`;
        const res = await client.query(query, [userId]);
        return res.rows;
    } catch (err) {
        console.log(err);
        return err;
    } finally {
        client && client.release();
    }
}

export async function addNewRequest(newRequest: Request) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        await client.query(`set schema 'Heroes';`);
        const query = `INSERT INTO requests (author, datesubmitted, dateresolved, description, resolver, status, type) VALUES ($1, $2, $3, $4, $5, $6, $7);`;
        const res = await client.query(query, [newRequest.author, newRequest.datesubmitted, newRequest.dateresolved, newRequest.description, newRequest.resolver, newRequest.status, newRequest.type]);
        return res.rows;
    } catch (err) {
        console.log(err);
        return err;
    } finally {
        client && client.release();
    }
}

export async function updateRequest(newRequest: Request) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        await client.query(`set schema 'Heroes';`);
        let res: any;
        if (newRequest.author != undefined) {
            const query = `UPDATE requests SET author = $1 WHERE requestid = $2;`;
            res = await client.query(query, [newRequest.author, newRequest.requestId]);
        }
        if (newRequest.datesubmitted != undefined) {
            const query = `UPDATE requests SET datesubmitted = $1 WHERE requestid = $2;`;
            res = await client.query(query, [newRequest.datesubmitted, newRequest.requestId]);
        }
        if (newRequest.dateresolved != undefined) {
            const query = `UPDATE requests SET dateresolved = $1 WHERE requestid = $2;`;
            res = await client.query(query, [newRequest.dateresolved, newRequest.requestId]);
        }
        if (newRequest.description != undefined) {
            const query = `UPDATE requests SET description = $1 WHERE requestid = $2;`;
            res = await client.query(query, [newRequest.description, newRequest.requestId]);
        }
        if (newRequest.resolver != undefined) {
            const query = `UPDATE requests SET resolver = $1 WHERE requestid = $2;`;
            res = await client.query(query, [newRequest.resolver, newRequest.requestId]);
        }
        if (newRequest.status != undefined) {
            const query = `UPDATE requests SET description = $1 WHERE requestid = $2;`;
            res = await client.query(query, [newRequest.status, newRequest.requestId]);
        }
        if (newRequest.type != undefined) {
            const query = `UPDATE requests SET type = $1 WHERE requestid = $2;`;
            res = await client.query(query, [newRequest.type, newRequest.requestId]);
        }
        const query = `SELECT * FROM requests WHERE requestId = $1;`;
        res = await client.query(query, [newRequest.requestId]);
        return res.rows;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
}