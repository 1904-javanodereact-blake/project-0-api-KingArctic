import express from 'express';
import { authorization } from '../middleware/authorization';
import { findAllRequestByStatusID, findAllRequestByUserID, addNewRequest, updateRequest } from '../daos/request.dao';
import Request from '../classes/request';
export const requestRouter = express.Router();

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
    if (!tempRequest) {
        res.sendStatus(404);
    }
    else {
        res.json(await addNewRequest(tempRequest));
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
    if (!tempRequest) {
        res.sendStatus(404);
    }
    else {
        res.json(await updateRequest(tempRequest));
    }
});