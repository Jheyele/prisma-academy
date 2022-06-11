import { Request, Response } from "express";
import { prismaClient } from "../../../../database/prismaClient";

export class UpdateUserController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email, phone, pass, isAdmin } = req.body;

        try {
            const userExist = await prismaClient.user.findUnique({ where: { id } });

            if (!userExist) {
                return res.status(400).json("This user is not registered");
            }

            const user = await prismaClient.user.update({
                where: {
                    id
                },
                data: {
                    name,
                    email,
                    phone,
                    password: pass,
                    isAdmin
                },
                select: {
                    name: true,
                    email: true,
                    phone: true,
                    isAdmin: true
                }
            });
            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json("Invalid data");
        }

    }
}