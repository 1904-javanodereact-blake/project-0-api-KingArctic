import express from 'express';
import { theUsers } from '../classes';
import { findAllUsers, findUserByID } from '../daos/users.dao';
import { authorization } from '../middleware/authorization';
export const userRouter = express.Router();

userRouter.get('', authorization([1, 2]), async (req, res) => {
    res.json(await findAllUsers());
});

userRouter.get('/:id', async (req, res) => {
    if (req.session.user && req.session.user.roleid == 4 && req.session.user.userid == req.params.id)
        res.json(await findUserByID(req.params.id));
    else if (req.session.user && req.session.user.roleid < 4)
        res.json(await findUserByID(req.params.id));
    else
        res.sendStatus(403);
});

userRouter.patch('', (req, res) => {
    const { body } = req;
    const theUser = theUsers.find(user => { return user.userId === body.userId; });
    if (!theUser) {
        res.sendStatus(404);
    }
    else {
        for (const field in theUser) {
            if (body[field] !== undefined) {
                theUser[field] = body[field];
            }
        }
        res.json(theUser);
    }
});