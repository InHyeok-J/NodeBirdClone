import express from 'express';
import * as PostsServices from '../services/PostsServices';
import * as AuthHandler from '../middleware/AuthHandler';

const Router = express.Router();

Router.get('/', PostsServices.getPosts);

export default Router;
