import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

import authConfig from '../../_config/auth';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ error: 'token not sent' });
        }

        try {
            const decoded = jwt.verify(token, authConfig.secret) as any;
            req.userId = decoded.id;

            return next();
        } catch (err) {
            return res.status(401).json({ error: 'token invalid' });
        }
    } catch (err) {
        console.log(err);
    }

    return res.status(500).json({ error: 'Authorization error' });
};