import { Request, Response } from "express";
import { prismaClient } from "../../../../database/prismaClient";

export class CreateClassController {
    async handle(req: Request, res: Response) {
        const { name, teacher } = req.body;

        if (name && teacher) {
            const classe = await prismaClient.class.create({
                data: {
                    name,
                    teacher
                }
            })
            return res.status(201).json(classe);
        } else {
            return res.status(400).json("Invalid data");
        }


    }
}