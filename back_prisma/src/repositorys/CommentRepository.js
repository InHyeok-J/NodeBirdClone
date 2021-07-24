import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createComment = async ({ content, UserId, PostId }) => {
    try {
        return await prisma.comment.create({
            data: {
                content: content,
                UserId: UserId,
                PostId: PostId,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findById = async (id) => {
    try {
        return await prisma.comment.findUnique({
            where: { id },
            select: {
                id: true,
                content: true,
                commenter: {
                    select: {
                        id: true,
                        nickname: true,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};
