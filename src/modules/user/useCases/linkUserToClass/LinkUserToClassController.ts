import { Request, Response } from "express";
import { prismaClient } from "../../../../database/prismaClient";


export class LinkUserToClassController {
    async handle(req: Request, res: Response) {
        const { user_id, class_id } = req.body;

        const userClass = await prismaClient.userClass.create({
            data: {
                id_class: class_id,
                id_user: user_id
            }
        })
        return res.status(201).json(userClass);
    }
}