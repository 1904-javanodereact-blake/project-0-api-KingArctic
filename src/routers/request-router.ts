import express from 'express';
/* import { authorization } from '../middleware/authorization'; */
import { findAllRequests, findAllRequestByStatusID, findAllRequestByUserID, addNewRequest, updateRequest, findAllRequestByUsersName, findAllRequestByStatusType } from '../daos/request.dao';
import Request from '../classes/request';
export const requestRouter = express.Router();

requestRouter.get('', /* authorization([1, 2]),  */async (req, res) => {
    res.json(await findAllRequests());
    console.log('Getting requests....');
});

requestRouter.get('/status/id/:id', /* authorization([1, 2]), */ async (req, res) => {
    res.json(await findAllRequestByStatusID(req.params.id));
});

requestRouter.get('/status/type/:type', /* authorization([1, 2]), */ async (req, res) => {
    res.json(await findAllRequestByStatusType(req.params.type));
});

requestRouter.get('/author/id/:id', async (req, res) => {
    console.log('finding request by user');
    /*     if (req.session.user && req.session.user.roleid == 4 && req.session.user.userid == req.params.userId)
            res.json(await findAllRequestByUserID(req.params.userId));
        else if (req.session.user && req.session.user.roleid < 3) */
    res.json(await findAllRequestByUserID(req.params.id));
    /*     else
            res.sendStatus(403); */
});

requestRouter.get('/author/name/:name', async (req, res) => {
    console.log('finding request by user');
    /*     if (req.session.user && req.session.user.roleid == 4 && req.session.user.userid == req.params.userId)
            res.json(await findAllRequestByUsersName(req.params.name));
        else if (req.session.user && req.session.user.roleid < 3) */
    res.json(await findAllRequestByUsersName(req.params.name));
    /*     else
            res.sendStatus(403); */
});

requestRouter.post('', async (req, res) => {
    const body = req.body;
    const tempRequest = new Request(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    for (const field in tempRequest) {
        if (body[field] != undefined) {
            tempRequest[field] = body[field];
        }
    }
    console.log(req.session.user);

    tempRequest.author = req.session.user.userid;
    tempRequest.status = 1;
    tempRequest.resolver = undefined;
    tempRequest.dateresolved = undefined;

    console.log(tempRequest);

    const newReturn = await addNewRequest(tempRequest);

    if (newReturn) {
        res.status(202);
        res.json(newReturn);
    }
    else {
        res.sendStatus(404);
    }
});

requestRouter.patch('', /*  authorization([1, 2]), */ async (req, res) => {
    const body = req.body;
    const tempRequest = new Request(body.requestid, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    for (const field in tempRequest) {
        if (body[field] != undefined) {
            tempRequest[field] = body[field];
        }
    }

    if (tempRequest.status === 2 || tempRequest.status === 3) {
        tempRequest.resolver = req.session.user.userid;
        tempRequest.dateresolved = new Date();
    }

    if (tempRequest.requestId != undefined) {
        const updateReturn = await updateRequest(tempRequest);

        if (updateReturn) {
            res.status(202);
            res.json(updateReturn);
        }
        else {
            res.sendStatus(400);
        }
    }
    else {
        res.sendStatus(400);
    }
});