import session from 'express-session';
import User from '../classes/users';

const sess = {
    secret: '42',
    cookie: { secure: false },
    resave: false,
    saveUninitialized: false,
    user: new User(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined)
};

export const sessionMiddleware = session(sess);