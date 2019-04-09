import express from 'express';
import bodyParser = require('body-parser');
import { sessionMiddleware } from './middleware/session';
import { userRouter } from './routers/user-router';

const app = express();

app.use((req, res, next) => 
{
    console.log(`Request made url: ${req.url} and method: ${req.method}`);
    next();
})

app.use(bodyParser.json());

app.use(sessionMiddleware);

app.use('/users', userRouter);

app.listen(8080);