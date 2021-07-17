import { PrismaClient } from "@prisma/client";

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

export const createUser = async (data) => {
    try {
        return await prisma.user.create({
            data,
        });
    } catch (err) {
        console.error(err);
    }
};
