import express from 'express';
import { findUserByUsernameAndPassword } from '../daos/users.dao';
export const loginRouter = express.Router();

loginRouter.post('', async (req, res) => {
    const { username, password } = req.body;
    console.log(`attempting to login...`);
    const temp = (await findUserByUsernameAndPassword(username, password));
    if (temp) {
        req.session.user = temp;
        console.log(`logged in...`);
        res.sendStatus(200);
    } else {
        res.sendStatus(400).send('Invalid Credentials');
    }
});