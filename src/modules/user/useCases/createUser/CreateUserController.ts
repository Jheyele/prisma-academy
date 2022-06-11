import { Request, Response } from "express";
import { prismaClient } from "../../../../database/prismaClient";
import { hash } from "bcryptjs";

export class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, phone, pass, isAdmin } = req.body;

        try {
            const checkEmailExist = await prismaClient.user.findFirst({ where: { email } });

            if (email && checkEmailExist) {
                // conflit
                return res.status(409).json("Email already registered");
            }

            const password = await hash(pass, 8);

            const user = await prismaClient.user.create({
                data: {
                    name,
                    email,
                    password,
                    isAdmin,
                    phone
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    isAdmin: true
                }
            })

            return res.status(201).json(user);
        } catch (err) {
            return res.status(400).json("Invalid data");
        }

    }
}