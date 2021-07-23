import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import db from "../../models";

const LocalStrategy = passportLocal.Strategy;

export default (passport) => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async (email, password, done) => {
                console.log(email, password);
                try {
                    const user = await db.User.findOne({
                        where: { email },
                    });
                    if (!user) {
                        return done(null, false, {
                            message: "존재하지 않는 이메일입니다.",
                        });
                    }
                    const result = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (result) {
                        return done(null, user); // 성공
                    }
                    return done(null, false, {
                        message: "비밀번호가 틀렸습니다.",
                    });
                } catch (err) {
                    console.error("DB 에러" + err);
                    done(err);
                }
            }
        )
    );
};
