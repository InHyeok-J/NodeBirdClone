import express from "express";
import * as userController from "../controllers/userController";
import * as AuthHandler from "../middlewares/AuthHandler";
const router = express.Router();

router.get("/", userController.GetUser);
router.post("/", AuthHandler.isNotLoggedIn, userController.SignUp); // POST /user/login
router.post("/login", AuthHandler.isNotLoggedIn, userController.Login); //POST /user/login
router.get("/logout", AuthHandler.isLoggedIn, userController.LogOut); //GET /user/logout
router.patch(
    "/nickname",
    AuthHandler.isLoggedIn,
    userController.ChangeNickname
);
router.patch("/:userId/follow", AuthHandler.isLoggedIn, userController.Follow);
router.delete(
    "/:userId/follow",
    AuthHandler.isLoggedIn,
    userController.unFollow
);
router.delete(
    "/follower/:userId",
    AuthHandler.isLoggedIn,
    userController.RemoveFollower
);
router.get("/followers", AuthHandler.isLoggedIn, userController.FollowList);
router.get("/followings", AuthHandler.isLoggedIn, userController.FollowingList);
export default router;
