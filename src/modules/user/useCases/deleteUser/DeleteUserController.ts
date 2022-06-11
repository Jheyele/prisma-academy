import { Request, Response } from "express";
import { prismaClient } from "../../../../database/prismaClient";

export class DeleteUserController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        const userExist = await prismaClient.user.findUnique({ where: { id } });

        if (!userExist) {
            return res.status(400).json("This user is not registered");
        }

        const user = await prismaClient.user.delete({
            where: {
                id
            }
        });

        return res.status(204).send();
    }
}