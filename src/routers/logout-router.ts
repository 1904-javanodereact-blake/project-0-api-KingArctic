import express from 'express';
import User from '../classes/users';
export const logoutRouter = express.Router();

logoutRouter.post('', async (req, res) => {
    console.log('logging out');
    req.session.user = new User(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined);
    res.status(200);
    res.json(req.session.user);
});