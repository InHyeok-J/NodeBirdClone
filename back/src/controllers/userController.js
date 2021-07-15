import db from "../models";
import bcrypt from "bcrypt";

export const SignUp = async (req, res, next) => {
    try {
        const exUser = await db.User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (exUser) {
            return res.status(403).send("이미 사용중인 아이디입니다.");
            //403 : 금지의 의미
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const result = await db.User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        res.status(201).send(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
};
