import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export default class ClassController {

    async CreateClass(req: Request, res: Response){
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

    async DeleteClass(req: Request, res: Response) {
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

    async FindAllClass(request: Request, response: Response) {

        const classes = await prismaClient.class.findMany();

        return response.json(classes);
    }

        
}