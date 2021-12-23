import chalk from "chalk";
import { Response, Request } from "express";
import _ExceptionDefault from "../_ExceptionDefault";

export function sessionErrorHandler(error: any, res: Response, req: Request): Response {
    console.log(chalk.bold.yellow(`${req.streamId}: ${error}`));

    return res
        .status(_ExceptionDefault.session.code)
        .json({ error: _ExceptionDefault.session.message });
}