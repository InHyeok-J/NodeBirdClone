import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findAllPost = async () => {
    try {
        return await prisma.post.findMany({
            take: 10,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                content: true,
                author: {
                    select: {
                        id: true,
                        nickname: true,
                    },
                },
                Comments: {
                    select: {
                        UserId: true,
                        content: true,
                        createdAt: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                Images: true,
                Liker: {
                    select: {
                        UserId: true,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const createPost = async ({ content, userId }) => {
    try {
        return await prisma.post.create({
            data: {
                content: content,
                UserId: userId,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findPostById = async (id) => {
    try {
        return await prisma.post.findUnique({
            where: { id: id },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateLiker = async ({ UserId, PostId }) => {
    try {
        return await prisma.post.update({
            where: {
                id: PostId,
            },
            data: {
                Liker: {
                    create: {
                        UserId: UserId,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const deleteLiker = async ({ UserId, PostId }) => {
    try {
        return await prisma.post.update({
            where: {
                id: PostId,
            },
            data: {
                Liker: {
                    delete: {
                        PostId_UserId: { UserId, PostId },
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};
