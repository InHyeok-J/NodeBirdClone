import express from 'express';
import * as PostServices from '../services/PostServices';
import * as AuthHandler from '../middleware/AuthHandler';

const Router = express.Router();

Router.post('/', AuthHandler.isLoggedIn, PostServices.createPost);
Router.post(
    '/:postId/comment',
    AuthHandler.isLoggedIn,
    PostServices.createComment
);
Router.patch('/:postId/like', PostServices.postLike);
Router.delete('/:postId/unlike', PostServices.postUnLike);

export default Router;
