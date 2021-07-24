import * as PostRepository from '../repositorys/PostRepository';

export const getPosts = async (req, res, next) => {
    try {
        const Posts = await PostRepository.findAllPost();
        console.log(Posts);
        return res.send(Posts);
    } catch (err) {
        console.error(err);
        next(err);
    }
};
