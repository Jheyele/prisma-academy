import { Request, Response } from "express";
import { prismaClient } from "../../../../database/prismaClient";

export class FindAllClassController {
    async handle(request: Request, response: Response) {

        const classes = await prismaClient.class.findMany();

        return response.json(classes);
    }
}