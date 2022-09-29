import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export class AuthController {
    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;
        console.log("TESTE", email, password)
        const userExist = await prismaClient.user.findFirst({ where: { email } });

        if (!userExist) {
            return res.status(401).json("Authentication failure");
        }

        const isValidPassword = await bcrypt.compare(password, userExist.password);

        if (!isValidPassword) {
            return res.status(401).json("Authentication failure");
        }

        const token = jwt.sign({ id: userExist.id, isAdmin: userExist.isAdmin }, process.env.SECRET_KEY_JWT as string, { expiresIn: '2h' });

        const user = {
            "id": userExist.id,
            "name": userExist.name
        }
        return res.json({
            user,
            token,
        });
    }
}