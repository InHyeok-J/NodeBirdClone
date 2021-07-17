import * as UserRepository from "../repositorys/UserRepository";
import bcrypt from "bcrypt";

export const SingUp = async (req, res, next) => {
    try {
        console.log(req.body);
        const exUser = await UserRepository.findUserByEmail(req.body.email);
        console.log(exUser);
        if (exUser) {
            return res.send("이미 가입된 회원입니다.");
        } else {
            req.body.password = await bcrypt.hash(req.body.password, 12);
            const response = await UserRepository.createUser(req.body);
            return res.send(response);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};
