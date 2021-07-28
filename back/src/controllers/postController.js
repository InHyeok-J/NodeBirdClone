import db from "../models";

export const PostPost = async (req, res, next) => {
    try {
        const hashtags = req.body.content.match(/#[^\s]+/g);
        const post = await db.Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        if (hashtags) {
            const result = await Promise.all(
                hashtags.map((tag) =>
                    db.Hashtag.findOrCreate({
                        where: { name: tag.slice(1).toLowerCase() },
                    })
                )
            );
            await post.addHashtags(result.map((v) => v[0]));
        }
        if (req.body.image) {
            if (Array.isArray(req.body.image)) {
                // 이미지를 여러개 올린 경우
                const images = await Promise.all(
                    req.body.image.map((image) =>
                        db.Image.create({ src: image })
                    )
                );
                await post.addImages(images);
            } else {
                // 이미지를 하나만 올린 경우
                const images = await db.Image.create({
                    src: req.body.image,
                });
                await post.addImages(images);
            }
        }
        const fullPost = await db.Post.findOne({
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

export const PostDelete = async (req, res, next) => {
    try {
        await db.Post.destroy({
            where: { id: req.params.postId, UserId: req.user.id },
        });
        res.json({ PostId: parseInt(req.params.postId, 10) });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const UpLoadImages = async (req, res, next) => {
    try {
        console.log(req.files);
        res.json(req.files.map((v) => v.filename));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const retweet = async (req, res, next) => {
    try {
        const post = await db.Post.findOne({
            where: { id: req.params.postId },
            include: [
                {
                    model: db.Post,
                    as: "Retweet",
                },
            ],
        });
        if (!post) {
            return res.status(403).send("존재하지 않는 게시글입니다.");
        }
        if (
            req.user.id === post.UserId ||
            (post.Retweet && post.Retweet.UserId === req.user.id)
        ) {
            return res.status(403).send("자신의 글은 리트윗할 수는 없습니다.");
        }
        const retweetTragetId = post.RetweetId || post.id;
        const exPost = await db.Post.findOne({
            where: {
                UserId: req.user.id,
                RetweetId: retweetTragetId,
            },
        });
        if (exPost) {
            return res.status(403).send("이미 리트윗했습니다.");
        }
        const retweet = await db.Post.create({
            UserId: req.user.id,
            RetweetId: retweetTragetId,
            content: "retweet",
        });
        const retweetWithPrevPost = await db.Post.findOne({
            where: { id: retweet.id },
            include: [
                {
                    model: db.Post,
                    as: "Retweet",
                    include: [
                        {
                            model: db.User,
                            attributes: ["id", "nickname"],
                        },
                        {
                            model: db.Image,
                        },
                    ],
                },
                {
                    model: db.User,
                    attributes: ["id", "nickname"],
                },
                { model: db.Image },
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
                    as: "Likers",
                    attributes: ["id"],
                },
            ],
        });
        res.status(200).json(retweetWithPrevPost);
    } catch (err) {
        console.error(err);
        next(err);
    }
};
