import { connectionPool } from '.';
import { PoolClient } from 'pg';
import Request from '../classes/request';

export async function findAllRequests() {
    let client: PoolClient;
    try {
        console.log('Trying to connect');
        client = await connectionPool.connect();
        console.log('Trying to set schema');
        await client.query(`set schema 'Heroes';`);
        const query = `SELECT requests.requestid, a.userid as authorid, a.firstname as authorfirst, a.lastname as authorlast, requests.datesubmitted, requests.dateresolved,
        requests.description, r.firstname as resolverfirst, r.lastname as resolverlast, rs.status, rt.type, rt.imageurl
       FROM requests
       LEFT JOIN users a
       ON requests.author = a.userid
       LEFT JOIN users r
       ON requests.resolver = r.userid
       LEFT JOIN requeststatus rs
       ON requests.status = rs.statusid
       LEFT JOIN requesttype rt
       ON requests.type = rt.typeid
       ORDER BY requests.requestid;`;
        console.log('Trying to retrieve requests');
        const res = await client.query(query);
        console.log('Requests retrieved');
        console.log(res.rows);
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
        const query = `SELECT requests.requestid, a.userid as authorid, a.firstname as authorfirst, a.lastname as authorlast, requests.datesubmitted, requests.dateresolved,
        requests.description, r.firstname as resolverfirst, r.lastname as resolverlast, rs.status, rt.type, rt.imageurl
       FROM requests
       LEFT JOIN users a
       ON requests.author = a.userid
       LEFT JOIN users r
       ON requests.resolver = r.userid
       LEFT JOIN requeststatus rs
       ON requests.status = rs.statusid
       LEFT JOIN requesttype rt
       ON requests.type = rt.typeid
       WHERE requests.status = $1
       ORDER BY requests.requestid;`;
        const res = await client.query(query, [statusid]);
        return res.rows;
    } catch (err) {
        console.log(err);
        return err;
    } finally {
        client && client.release();
    }
}

export async function findAllRequestByStatusType(status: string) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        await client.query(`set schema 'Heroes';`);
        const query = `SELECT requests.requestid, a.userid as authorid, a.firstname as authorfirst, a.lastname as authorlast, requests.datesubmitted, requests.dateresolved,
        requests.description, r.firstname as resolverfirst, r.lastname as resolverlast, rs.status, rt.type, rt.imageurl
       FROM requests
       LEFT JOIN users a
       ON requests.author = a.userid
       LEFT JOIN users r
       ON requests.resolver = r.userid
       LEFT JOIN requeststatus rs
       ON requests.status = rs.statusid
       LEFT JOIN requesttype rt
       ON requests.type = rt.typeid
       WHERE rs.status = $1
       ORDER BY requests.requestid;`;
        const res = await client.query(query, [status]);
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
        const query = `SELECT requests.requestid, a.userid as authorid, a.firstname as authorfirst, a.lastname as authorlast, requests.datesubmitted, requests.dateresolved,
        requests.description, r.firstname as resolverfirst, r.lastname as resolverlast, rs.status, rt.type, rt.imageurl
       FROM requests
       LEFT JOIN users a
       ON requests.author = a.userid
       LEFT JOIN users r
       ON requests.resolver = r.userid
       LEFT JOIN requeststatus rs
       ON requests.status = rs.statusid
       LEFT JOIN requesttype rt
       ON requests.type = rt.typeid
        WHERE requests.author = $1
        ORDER BY requests.requestid;`;
        const res = await client.query(query, [userId]);
        console.log(res.rows);
        return res.rows;
    } catch (err) {
        console.log(err);
        return err;
    } finally {
        client && client.release();
    }
}

export async function findAllRequestByUsersName(username: string) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        await client.query(`set schema 'Heroes';`);
        const query = `SELECT requests.requestid, a.userid as authorid, a.firstname as authorfirst, a.lastname as authorlast, requests.datesubmitted, requests.dateresolved,
        requests.description, r.firstname as resolverfirst, r.lastname as resolverlast, rs.status, rt.type, rt.imageurl
       FROM requests
       LEFT JOIN users a
       ON requests.author = a.userid
       LEFT JOIN users r
       ON requests.resolver = r.userid
       LEFT JOIN requeststatus rs
       ON requests.status = rs.statusid
       LEFT JOIN requesttype rt
       ON requests.type = rt.typeid
       WHERE concat(a.firstname, ' ', a.lastname) = $1
        ORDER BY requests.requestid;`;
        const res = await client.query(query, [username]);
        console.log(res.rows);
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
            const query = `UPDATE requests SET status = $1 WHERE requestid = $2;`;
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