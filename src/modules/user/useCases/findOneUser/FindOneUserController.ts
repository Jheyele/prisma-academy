import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { prismaClient } from "../../../../database/prismaClient";

export const userSelect: Prisma.UserSelect = {
    id: true,
    name: true,
    email: true,
    phone: true,
    isAdmin: true,
    UserClass: {
        include: {
            class: true
        }
    }
}

export class FindOneUserController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        const user = await prismaClient.user.findUnique({
            where: {
                id
            },
            select: userSelect
        });

        if (!user) {
            return res.status(400).json("This user is not registered");
        }

        return res.status(200).json(user);
    }
}