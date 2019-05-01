import express from 'express';
export const logoutRouter = express.Router();

logoutRouter.post('', async (req, res) => {
    console.log('logging out');
    req.session.user = undefined;
    res.sendStatus(200);
});