import express from 'express';
import { authorization } from '../middleware/authorization';
import { findAllRequestByStatusID, findAllRequestByUserID } from '../daos/request.dao';
export const requestRouter = express.Router();

requestRouter.get('/status/:statusId', authorization([1, 2]), async (req, res) => {
    res.json(await findAllRequestByStatusID(req.params.statusId));
});

requestRouter.get('/author/:userId', authorization([1, 2]), async (req, res) => {
    res.json(await findAllRequestByUserID(req.params.userId));
});