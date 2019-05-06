import express from 'express';
import { findAllUsers, findUserByID, updateUser, findUserByName, findUserByHeroName, findUserByRoleName } from '../daos/users.dao';
/* import { authorization } from '../middleware/authorization'; */
import User from '../classes/users';
export const userRouter = express.Router();

userRouter.get('', /* authorization([1, 2]), */ async (req, res) => {
    res.json(await findAllUsers());
});

userRouter.get('/id/:id', async (req, res) => {
    // if (req.session.user && req.session.user.roleid == 4 && req.session.user.userid == req.params.id)
    res.json(await findUserByID(req.params.id));
    // else if (req.session.user && req.session.user.roleid < 4)
    // res.json(await findUserByID(req.params.id));
    // else
    // res.sendStatus(403);
});

userRouter.get('/name/:name', async (req, res) => {
    /*     if (req.session.user && req.session.user.roleid == 4 && req.session.user.userid == req.params.id)
            res.json(await findUserByName(req.params.name));
        else if (req.session.user && req.session.user.roleid < 4) */
    res.json(await findUserByName(req.params.name));
    /*     else
            res.sendStatus(403); */
});

userRouter.get('/heroname/:name', async (req, res) => {
    /*     if (req.session.user && req.session.user.roleid == 4 && req.session.user.userid == req.params.id)
            res.json(await findUserByName(req.params.name));
        else if (req.session.user && req.session.user.roleid < 4) */
    res.json(await findUserByHeroName(req.params.name));
    /*     else
            res.sendStatus(403); */
});

userRouter.get('/role/:rolename', async (req, res) => {
    // if (req.session.user && req.session.user.roleid == 4 && req.session.user.userid == req.params.id)
    res.json(await findUserByRoleName(req.params.rolename));
    // else if (req.session.user && req.session.user.roleid < 4)
    // res.json(await findUserByID(req.params.id));
    // else
    // res.sendStatus(403);
});

userRouter.get('/sessionuser', async (req, res) => {
    console.log('endpoint hit');
    if (req.session.user === undefined) {
        console.log('hit 401');
        res.status(401);
    }
    else {
        console.log('hit 200');
        res.status(200);
    }
    res.json(req.session.user);
});

userRouter.patch('', /* authorization([1, 2]),  */async (req, res) => {
    const body = req.body;
    console.log(body);
    const tempUser = new User(body.userid, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    for (const field in tempUser) {
        if (body[field] != undefined) {
            tempUser[field] = body[field];
        }
    }

    if (tempUser.userid != undefined) {
        const updateReturn = await updateUser(tempUser);

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