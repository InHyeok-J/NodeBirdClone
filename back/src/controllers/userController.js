import db from "../models";
import passport from "passport";
import bcrypt from "bcrypt";

export const GetUser = async (req, res, next) => {
    console.log(req.headers);
    try {
        if (req.user) {
            const user = await db.User.findOne({
                where: { id: req.user.id },
            });
            const fullUserWithoutPassword = await db.User.findOne({
                where: { id: user.id },
                attributes: { exclude: ["password"] },
                include: [
                    {
                        model: db.Post,
                        attributes: ["id"],
                    },
                    {
                        model: db.User,
                        as: "Followings",
                        attributes: ["id"],
                    },
                    {
                        model: db.User,
                        as: "Followers",
                        attributes: ["id"],
                    },
                ],
            });
            res.status(200).json(fullUserWithoutPassword);
        } else {
            res.status(200).json(null);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

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

export const Login = (req, res, next) => {
    //미들웨어 확장.

    passport.authenticate("local", (err, user, info) => {
        //info -> Client error
        console.log("authenticate");
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.message); //401: 허가되지 않음.
        }
        if (!user) return res.send("유저가 없습니다.");
        req.login(user, async (err) => {
            //passport login 시도 -> session에 저장함.
            if (err) {
                //passport login에서 에러가 나는 경우.(제로초말로는 한번도 본적없음.)
                console.error(err);
                return next(err);
            }
            const fullUserWithoutPassword = await db.User.findOne({
                where: { id: user.id },
                attributes: { exclude: ["password"] },
                include: [
                    {
                        model: db.Post,
                        attributes: ["id"],
                    },
                    {
                        model: db.User,
                        as: "Followings",
                        attributes: ["id"],
                    },
                    {
                        model: db.User,
                        as: "Followers",
                        attributes: ["id"],
                    },
                ],
            });
            return res.send(fullUserWithoutPassword);
        });
    })(req, res, next);
};

export const LogOut = (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            next(err);
        } else {
            res.clearCookie("connect.sid");
            res.status(200).send("로그아웃 성공");
        }
    });
};

export const ChangeNickname = async (req, res, next) => {
    try {
        await db.User.update(
            {
                nickname: req.body.nickname,
            },
            {
                where: { id: req.user.id },
            }
        );
        res.status(200).json({ nickname: req.body.nickname });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const Follow = async (req, res, next) => {
    try {
        const user = await db.User.findOne({
            where: { id: parseInt(req.params.userId, 10) },
        });
        if (!user) {
            return res.status(404).send("없는 사람을 팔로우 할수 없습니다.");
        }
        await user.addFollowers(req.user.id);
        res.status(200).send({ UserId: parseInt(req.params.userId, 10) });
    } catch (err) {
        console.error(err);
        next(err);
    }
};
export const unFollow = async (req, res, next) => {
    try {
        const user = await db.User.findOne({
            where: { id: parseInt(req.params.userId, 10) },
        });
        if (!user) {
            return res
                .status(404)
                .send("없는 사람을 팔로우취소 할수 없습니다.");
        }
        await user.removeFollowers(req.user.id);
        res.status(200).send({ UserId: parseInt(req.params.userId, 10) });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const FollowList = async (req, res, next) => {
    try {
        const user = await db.User.findOne({
            where: { id: req.user.id },
        });
        if (!user) {
            return res.status(404).send("없는 사람입니다.");
        }
        const followers = await user.getFollowers();
        res.status(200).json(followers);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const FollowingList = async (req, res, next) => {
    try {
        const user = await db.User.findOne({
            where: { id: req.user.id },
        });
        if (!user) {
            return res.status(404).send("없는 사람입니다.");
        }
        const followings = await user.getFollowings();
        res.status(200).json(followings);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const RemoveFollower = async (req, res, next) => {
    try {
        console.log(req.params.userId);
        const user = await db.User.findOne({
            where: { id: parseInt(req.params.userId, 10) },
        });
        if (!user) {
            return res.status(404).send("없는 사람을 차단할 수는 없습니다");
        }
        await user.removeFollowing(req.user.id);
        res.status(200).send({ UserId: parseInt(req.params.userId, 10) });
    } catch (err) {
        console.error(err);
        next(err);
    }
};
