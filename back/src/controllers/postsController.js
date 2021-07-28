import db from "../models";
import { Op } from "sequelize";

export const PostsPost = async (req, res, next) => {
    try {
        const where = {};
        if (parseInt(req.query.lastId, 10)) {
            // 초기 로딩이 아닐때
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }; //보다 작은
        }
        const posts = await db.Post.findAll({
            where,
            limit: 10,
            order: [
                ["createdAt", "DESC"],
                [db.Comment, "createdAt", "DESC"],
            ],
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
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        next(err);
    }
};
