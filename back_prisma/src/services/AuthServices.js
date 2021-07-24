import * as UserRepository from '../repositorys/UserRepository';
import bcrypt from 'bcrypt';
import passport from 'passport';

export const SingUp = async (req, res, next) => {
    try {
        console.log(req.body);
        const exUser = await UserRepository.findUserByEmail(req.body.email);
        console.log(exUser);
        if (exUser) {
            return res.send('이미 가입된 회원입니다.');
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

export const Login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send(info.message);
        }
        req.login(user, (err) => {
            if (err) {
                //passport login 실행단계
                console.error(err);
                next(err);
            }
            return res.status(200).send(user);
        });
    })(req, res, next);
};

export const LogOut = (req, res, next) => {
    req.logOut();
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            next(err);
        } else {
            res.clearCookie('connect.sid');
            res.send('로그아웃 성공');
        }
    });
};
