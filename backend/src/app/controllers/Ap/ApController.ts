import { Request, Response } from "express";

import { Ap } from "../../../_lib/database/main";
import _ExceptionDefault from "../../@exceptions/_ExceptionDefault";
import { internalErrorHandler } from "../../@exceptions/_handler/InternalErrorHandler";

class ApController {
    async index(req: Request, res: Response): Promise<any> {
        try {
            const aps = await Ap.findAll({ attributes: ['id', 'description'] });

            return res.json(aps);
        } catch (error) {
            return internalErrorHandler(error, res);
        }
    }
}

export default new ApController();
