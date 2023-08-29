import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { hash } from "bcryptjs";
import { Prisma } from "@prisma/client";

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

export class UserController {
    async createUser(req: Request, res: Response) {
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

    async deleteUser(req: Request, res: Response) {
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

    async findAllUsers(req: Request, res: Response) {


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

    async findOneUser(req: Request, res: Response) {
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

    async linkUserToClassController(req: Request, res: Response) {
        const { id_user, id_class } = req.body;

        try{
        const userClass = await prismaClient.userClass.create({
            data: {
                class_id: id_class,
                user_id: id_user
            }
        })
        return res.status(201);
    }catch{
        return res.status(400).json("Invalid data");
    }
       
    }

    async updateUser(req: Request, res: Response) {
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