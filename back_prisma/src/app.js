import express from "express";
import morgan from "morgan";
import env from "./configs";
import * as ErrorHandler from "./middleware/ErrorHandler";

import AuthController from "./controllers/AuthController";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 받은 데이터를 req에 넣어줌.

app.use("/user", AuthController);

//404Router handler
app.use(ErrorHandler.routerHanlder);

//Error Handler
app.use(ErrorHandler.logHandler);
app.use(ErrorHandler.errorHandler);

app.listen(env.PORT, () => {
    console.log("서버 시작");
});
