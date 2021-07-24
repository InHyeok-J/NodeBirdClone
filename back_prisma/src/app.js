import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import env from './configs';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import * as ErrorHandler from './middleware/ErrorHandler';
import cors from 'cors';
import passportConfig from './configs/passport';
import AuthController from './controllers/AuthController';
import PostController from './controllers/PostController';
import PostsController from './controllers/PostsController';

const app = express();

passportConfig(passport);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 받은 데이터를 req에 넣어줌.
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser(env.COOKIE_SECRET));
app.use(
    session({
        secret: env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => {
    console.log('패스포트 값 확인', req.session.passport);
    console.log('유저 값 확인', req.user.id);
    res.send('안녕');
});

app.use('/user', AuthController);
app.use('/post', PostController);
app.use('/posts', PostsController);

//404Router handler
app.use(ErrorHandler.routerHanlder);

//Error Handler
app.use(ErrorHandler.logHandler);
app.use(ErrorHandler.errorHandler);

app.listen(env.PORT, () => {
    console.log(env.PORT + '서버 시작');
});
