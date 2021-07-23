export const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        // 로그인 한 유저면 isAuthenticated == true
        next();
    } else {
        res.status(401).send("로그인이 필요합니다.");
    }
};

export const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // 로그인 안한 유저라면 isAuthenticated === false
        next();
    } else {
        res.status(401).send("잘못된 접근입니다.");
    }
};
