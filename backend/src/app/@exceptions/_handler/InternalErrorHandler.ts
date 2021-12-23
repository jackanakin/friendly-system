import chalk from "chalk";
import { Response } from "express";
import _ExceptionDefault from "../_ExceptionDefault";

export function internalErrorHandler(error: any, res: Response): Response {
    console.log(chalk.bold.red(`${new Date()}:${error}`));

    return res
        .status(_ExceptionDefault.internal.code)
        .json({ error: _ExceptionDefault.internal.message });
}