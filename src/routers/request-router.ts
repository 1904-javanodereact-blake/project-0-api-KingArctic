import express from 'express';
import { authorization } from '../middleware/authorization';
import { findAllRequests, findAllRequestByStatusID, findAllRequestByUserID, addNewRequest, updateRequest } from '../daos/request.dao';
import Request from '../classes/request';
export const requestRouter = express.Router();

requestRouter.get('', authorization([1, 2]), async (req, res) => {
    res.json(await findAllRequests());
});

requestRouter.get('/status/:statusId', authorization([1, 2]), async (req, res) => {
    res.json(await findAllRequestByStatusID(req.params.statusId));
});

requestRouter.get('/author/userId/:userId', async (req, res) => {
    if (req.session.user && req.session.user.roleid == 4 && req.session.user.userid == req.params.userId)
        res.json(await findAllRequestByUserID(req.params.userId));
    else if (req.session.user && req.session.user.roleid < 3)
        res.json(await findAllRequestByUserID(req.params.userId));
    else
        res.sendStatus(403);
});

requestRouter.post('', async (req, res) => {
    const body = req.body;
    const tempRequest = new Request(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    for (const field in tempRequest) {
        if (body[field] != undefined) {
            tempRequest[field] = body[field];
        }
    }
    tempRequest.status = 1;
    tempRequest.resolver = undefined;
    tempRequest.dateresolved = undefined;

    const newReturn = await addNewRequest(tempRequest);

    if (newReturn) {
        res.status(202);
        res.json(newReturn);
    }
    else {
        res.sendStatus(404);
    }
});

requestRouter.patch('', authorization([1, 2]), async (req, res) => {
    const body = req.body;
    const tempRequest = new Request(body.requestid, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    for (const field in tempRequest) {
        if (body[field] != undefined) {
            tempRequest[field] = body[field];
        }
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