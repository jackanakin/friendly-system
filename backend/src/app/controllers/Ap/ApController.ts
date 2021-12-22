import { Request, Response } from "express";

import Ap from "../../models/Ap";

class ApController {
    async index(req: Request, res: Response): Promise<any> {
        const aps = await Ap.findAll({ attributes: ['id', 'description'] });
        return res.json(aps);
    }
}

export default new ApController();
