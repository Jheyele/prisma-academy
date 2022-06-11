import { Request, Response } from "express";
import { prismaClient } from "../../../../database/prismaClient";

export class DeleteClassController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        const classExist = await prismaClient.class.findUnique({ where: { id } });

        if (!classExist) {
            return res.status(400).json("This class is not registered");
        }

        const classe = await prismaClient.class.delete({
            where: {
                id
            }
        });

        return res.status(204).send();
    }
}