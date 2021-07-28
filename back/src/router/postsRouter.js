import express from "express";
import * as postsController from "../controllers/postsController";
import * as AuthHandler from "../middlewares/AuthHandler";

const router = express.Router();

router.get("/", postsController.PostsPost);

export default router;
