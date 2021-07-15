import express from "express";
import db from "./models";
import env from "./configs";
import {
    logHandler,
    routerHanlder,
    errorHandler,
} from "./middlewares/ErrorHandler";

import postRouter from "./router/postRouter";
import userRouter from "./router/userRouter";

const app = express();

app.set("port", env.PORT || 3001);

//DB연동
db.sequelize
    .sync({ force: false })
    .then(() => {
        console.log("데이터베이스 연결 성공!!");
    })
    .catch((err) => {
        console.error(err);
    });
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 받은 데이터를 req에 넣어줌.

app.use("/post", postRouter);
app.use("/user", userRouter);
app.use(routerHanlder);

//error logging and handler
app.use(logHandler);
app.use(errorHandler);

//서버시작.
app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
});

export default app;
