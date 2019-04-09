import express from 'express';
import User from '../classes/users';
import { theUsers } from '../classes';
export const userRouter = express.Router();

userRouter.get('', (req, res) => {
    res.json(theUsers);
});

userRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    const theUser = theUsers.find(u => u.username === username && u.password === password);

    if (theUser) {
        req.session.user = theUser;
        res.end();
    }
    else {
        res.sendStatus(401);
    }
});

userRouter.get('/:id', (req, res) => {
    const theUser = theUsers.find(user => user.userId === +req.params.id);
    if (theUser) {
        res.json(theUser);
    }
    else {
        res.sendStatus(404);
    }
});

userRouter.get('/username/:username', (req, res) => {
    const theUser = theUsers.find(user => user.username === req.params.username);
    if (theUser) {
        res.json(theUser);
    }
    else {
        res.sendStatus(404);
    }
});

userRouter.post('', (req, res) => {
    const user: User = new User(req.body);
    theUsers.push(user);
    res.status(201);
    res.send(user);
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