import express from "express";
import * as postController from "../controllers/postController";
import * as AuthHandler from "../middlewares/AuthHandler";
const router = express.Router();

router.post("/", AuthHandler.isLoggedIn, postController.PostPost); //POST /post
router.post(
    //POST /post/1/comment
    "/:postId/comment",
    AuthHandler.isLoggedIn,
    postController.CommentPost
);
router.patch("/:postId/like", AuthHandler.isLoggedIn, postController.PostLike); //PATCH /post/1/like
router.delete(
    "/:postId/unlike",
    AuthHandler.isLoggedIn,
    postController.PostUnLike
); //DELETE /post/1/unlike

export default router;
