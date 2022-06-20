import { Request, Response } from "express";
import { prismaClient } from "../../../../database/prismaClient";

export class FindAllUsersController {
    async handle(req: Request, res: Response) {


        const users = await prismaClient.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                isAdmin: true
            }
        });

        return res.status(200).json(users);
    }
}