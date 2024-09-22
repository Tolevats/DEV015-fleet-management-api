//focusing purely on the db interactions

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// function to fetch taxis from the database
export const findTaxis = async (plate: string | undefined, skip: number, limit: number) => {
    return prisma.taxis.findMany({
        where: plate ? { plate: { contains: plate } } : {},
        skip,
        take: limit,
        select: {
            id: true,
            plate: true,
        },
    });
};
