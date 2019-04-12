import express from 'express';
import bodyParser from 'body-parser';
import { sessionMiddleware } from './middleware/session';
import { userRouter } from './routers/user-router';
import { loginRouter } from './routers/login-router';

const app = express();

app.use((req, res, next) => {
    next();
});

app.use(bodyParser.json());

app.use(sessionMiddleware);

app.use('/users', userRouter);
app.use('/login', loginRouter);


app.listen(8080);