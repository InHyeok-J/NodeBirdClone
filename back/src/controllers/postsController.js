import db from "../models";

export const PostsPost = async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            limit: 10,
            order: [
                ["createdAt", "DESC"],
                [db.Comment, "createdAt", "DESC"],
            ],
            include: [
                {
                    model: db.User,
                    attributes: ["id", "nickname"],
                },
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
                    model: db.User, // 좋아요 누른 사람.
                    as: "Likers",
                    attributes: ["id"],
                },
            ],
        });
        console.log(posts);
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        next(err);
    }
};
