import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

import authConfig from '../../_config/auth';
import { internalErrorHandler } from "../@exceptions/_handler/InternalErrorHandler";
import { sessionErrorHandler } from "../@exceptions/_handler/SessionErrorHandler";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return sessionErrorHandler("token not sent", res, req);
        }

        const [, token] = authHeader.split(' ');

        try {
            const decoded = jwt.verify(token, authConfig.secret) as any;
            req.userId = decoded.id;

            console.log(chalk.inverse(`${req.streamId} from user ${decoded.id}`));
            return next();
        } catch (err) {
            return sessionErrorHandler("token invalid", res, req);
        }

    } catch (error) {
        return internalErrorHandler(error, res);
    }
};