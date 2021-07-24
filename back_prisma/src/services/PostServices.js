import * as PostRepository from '../repositorys/PostRepository';
import * as CommentRepository from '../repositorys/CommentRepository';

export const createPost = async (req, res, next) => {
    try {
        const post = await PostRepository.createPost({
            content: req.body.content,
            userId: req.user.id,
        });
        const postData = await PostRepository.findPostById(post.id);

        return res.send(postData);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const createComment = async (req, res, next) => {
    try {
        const post = await PostRepository.findPostById(
            parseInt(req.params.postId, 10)
        );
        if (!post) return res.status(403).send('게시글을 찾을 수 없습니다.');
        const comment = await CommentRepository.createComment({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id,
        });
        const fullComment = await CommentRepository.findById(comment.id);
        res.status(200).send(fullComment);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const postLike = async (req, res, next) => {
    try {
        const post = await PostRepository.findPostById(
            parseInt(req.params.postId, 10)
        );
        if (!post) return res.status(403).send('게시글을 찾을 수 없습니다.');
        const Like = await PostRepository.updateLiker({
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id,
        });
        res.send(Like);
    } catch (err) {
        console.error(err);
        next(err);
    }
};
export const postUnLike = async (req, res, next) => {
    try {
        const post = await PostRepository.findPostById(
            parseInt(req.params.postId, 10)
        );
        if (!post) return res.status(403).send('게시글을 찾을 수 없습니다.');
        const Like = await PostRepository.deleteLiker({
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id,
        });
        res.send(Like);
    } catch (err) {
        console.error(err);
        next(err);
    }
};
