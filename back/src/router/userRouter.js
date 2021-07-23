import express from "express";
import * as userController from "../controllers/userController";
import * as AuthHandler from "../middlewares/AuthHandler";
const router = express.Router();

router.get("/", userController.GetUser);
router.post("/", AuthHandler.isNotLoggedIn, userController.SignUp); // POST /user/login
router.post("/login", AuthHandler.isNotLoggedIn, userController.Login); //POST /user/login
router.get("/logout", AuthHandler.isLoggedIn, userController.LogOut); //GET /user/logout

export default router;
