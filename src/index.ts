import express from 'express';
import bodyParser from 'body-parser';
import { sessionMiddleware } from './middleware/session';
import { loginRouter } from './routers/login-router';
import { logoutRouter } from './routers/logout-router';
import { userRouter } from './routers/user-router';
import { requestRouter } from './routers/request-router';

const app = express();

app.use((req, resp, next) => {
    // console.log(req.get('host'));
    (process.env.SHIP_API_STAGE === 'prod')
      ? resp.header('Access-Control-Allow-Origin')
      : resp.header('Access-Control-Allow-Origin', `${req.headers.origin}`);
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    resp.header('Access-Control-Allow-Credentials', 'true');
    resp.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, PATCH');
    next();
});

app.use(bodyParser.json());

app.use(sessionMiddleware);

app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/users', userRouter);
app.use('/requests', requestRouter);



app.listen(process.env['SERVER_PORT'] || 8081);

console.log(`Connected to server`);