import express from "express";
import * as postController from "../controllers/postController";
import * as AuthHandler from "../middlewares/AuthHandler";
import { upload } from "../controllers/imageController";

const router = express.Router();

router.post(
    "/",
    AuthHandler.isLoggedIn,
    upload.none(),
    postController.PostPost
); //POST /post
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
router.delete("/:postId", postController.PostDelete); //DELETE /:1

router.post(
    "/images",
    AuthHandler.isLoggedIn,
    upload.array("image"),
    postController.UpLoadImages
);
router.post("/:postId/retweet", AuthHandler.isLoggedIn, postController.retweet);

export default router;
