import localStrategy from "./localStartegy";
import db from "../../models";

export default (passport) => {
    passport.serializeUser((user, done) => {
        console.log("serializeUser");
        done(null, user);
    });
    passport.deserializeUser(async (user, done) => {
        try {
            console.log("deserializeUser");

            const findUser = await db.User.findOne({
                where: { email: user.email },
            });
            done(null, findUser);
        } catch (err) {
            console.error(err);
            done(err);
        }
    });
    localStrategy(passport);
};
