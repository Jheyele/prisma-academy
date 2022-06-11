import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IToken {
    id: string,
    isAdmin: string,
    iat: number,
    exp: number
}

export default function (req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json("Token missing!");
    }


    const token = authorization.replace('Bearer', '').trim();

    try {
        const { id } = verify(token, process.env.SECRET_KEY_JWT as string) as IToken;

        return next();

    } catch {
        return res.status(401).json("Invalid Token");
    }
}