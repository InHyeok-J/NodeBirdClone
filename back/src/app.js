import express from "express";
import session from "express-session";
import db from "./models";
import env from "./configs";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import passportConfig from "./configs/passport";
import morgan from "morgan";
import * as ErrorHandler from "./middlewares/ErrorHandler";

import postRouter from "./router/postRouter";
import userRouter from "./router/userRouter";
import postsRouter from "./router/postsRouter";

const app = express();

app.set("port", env.PORT || 3001);
passportConfig(passport);

//DB연동
db.sequelize
    .sync({ force: false })
    .then(() => {
        console.log("데이터베이스 연결 성공!!");
    })
    .catch((err) => {
        console.error(err);
    });
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 받은 데이터를 req에 넣어줌.
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

app.get("/", (req, res, next) => {
    console.log("패스포트 값 확인", req.session.passport);
    console.log("유저 값 확인", req.user.id);
    res.send("안녕");
});

//router
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/posts", postsRouter);

//404 Router error handler
app.use(ErrorHandler.routerHanlder);

//error logging and handler
app.use(ErrorHandler.logHandler);
app.use(ErrorHandler.errorHandler);

//서버시작.
app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
});

export default app;
