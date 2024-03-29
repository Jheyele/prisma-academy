import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface Payload {
    id: string,
    isAdmin: boolean,
    iat: number,
    exp: number
}

export default function (req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401);
    }

    try {
        const token = authorization.replace('Bearer', '').trim();
        const data = jwt.verify(token, process.env.SECRET_KEY_JWT as string);
        const { isAdmin } = data as Payload;

        if (isAdmin) {
            return next();
        }

        return res.status(403).json("The user does not have the necessary authorization!");

    } catch {
        return res.status(401);
    }
}