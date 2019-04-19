import express from 'express';
import bodyParser from 'body-parser';
import { sessionMiddleware } from './middleware/session';
import { userRouter } from './routers/user-router';
import { loginRouter } from './routers/login-router';
import { requestRouter } from './routers/request-router';

const app = express();

app.use((req, res, next) => {
    next();
});

app.use(bodyParser.json());

app.use(sessionMiddleware);

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/requests', requestRouter);



app.listen(process.env['HEROES_PORT']);

console.log(`Connected to server`);