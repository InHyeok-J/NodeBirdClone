import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findUserByEmail = async (email) => {
    try {
        return await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findById = async (id) => {
    try {
        return await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
export const createUser = async (data) => {
    try {
        return await prisma.user.create({
            data,
        });
    } catch (err) {
        console.error(err);
    }
};

export const findUserByIdWithData = async (id) => {
    try {
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                nickname: true,
                email: true,
                Posts: true,
                Followings: true,
                Followers: true,
                Liker: true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};
