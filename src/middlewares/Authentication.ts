import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).json({ error: 'JWT Token is missing!' });
    }

    const [, token] = authHeader.split(' ');


    try {
        const decoded = verify(token, authConfig.jwt.secret);
        const { sub } = decoded as TokenPayload;
        req.user = {
            id: sub
        }
        return next()
    } catch (error) {
        return res.status(400).json({ error: 'JWT Token invalid!' });

    }
};