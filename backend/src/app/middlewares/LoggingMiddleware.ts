import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

export default async (req: Request, res: Response, next: NextFunction) => {
    const current_datetime = new Date();
    const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const portAddress = req.connection.remotePort || req.connection.localPort || 0;

    const method = req.method;
    const url = req.url;

    const formatted_date =
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate() +
        " " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes() +
        ":" +
        current_datetime.getSeconds();


    const streamId = uuidv4();
    const log = `${streamId} [${formatted_date}] ${method}:${url} from ${ipAddress}:${portAddress}`;
    console.log(log);

    req.streamId = streamId;
    req.sourceSocket = { address: String(ipAddress), port: portAddress };
    return next();
};