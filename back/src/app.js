import express from "express";
import db from "./models";
import env from "./configs";

import postRouter from "./router/post";

const app = express();

app.set("port", env.PORT || 3001);
/* react client 를 사용할 예정이기에 view 생략
 */

db.sequelize
    .sync({ force: false })
    .then(() => {
        console.log("데이터베이스 연결 성공");
    })
    .catch((err) => {
        console.error(err);
    });

app.get("/", (req, res) => {
    res.send("hello express");
});

app.get("/api", (req, res) => {
    res.send("hello api");
});
app.use("/post", postRouter);

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
});
