import db from "../models";

export const PostPost = async (req, res, next) => {
    try {
        const post = await db.Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        const fullPost = await db.postPost.findOne({
            where: { id: post.id },
            include: [
                {
                    model: db.Image,
                },
                {
                    model: db.Comment,
                    include: [
                        {
                            model: db.User,
                            attributes: ["id", "nickname"],
                        },
                    ],
                },
                {
                    model: db.User,
                    attributes: ["id", "nickname"],
                },
                {
                    model: db.User, // 좋아요 누른 사람.
                    as: "Likers",
                    attributes: ["id"],
                },
            ],
        });
        res.status(201).json(fullPost);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const CommentPost = async (req, res, next) => {
    try {
        const post = await db.Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(403).send("존재하지 않는 게시글입니다.");
        }
        const comment = await db.Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id,
        });
        const fullComment = await db.Comment.findOne({
            where: {
                id: comment.id,
            },
            include: [
                {
                    model: db.User,
                    attributes: ["id", "nickname"],
                },
            ],
        });
        res.status(201).json(fullComment);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const PostLike = async (req, res, next) => {
    try {
        const post = await db.Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(403).send("게시글이 존재하지 않습니다.");
        }
        await post.addLikers(req.user.id);
        res.send({ PostId: post.id, UserId: req.user.id });
    } catch (err) {
        console.error(err);
        next(err);
    }
};
export const PostUnLike = async (req, res, next) => {
    try {
        const post = await db.Post.findOne({
            where: { id: req.params.postId },
        });
        if (!post) {
            return res.status(403).send("게시글이 존재하지 않습니다.");
        }
        await post.removeLikers(req.user.id);
        res.send({ PostId: post.id, UserId: req.user.id });
    } catch (err) {
        console.error(err);
        next(err);
    }
};
