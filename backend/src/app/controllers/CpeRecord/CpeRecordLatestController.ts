import { Request, Response } from "express";

import CpeRecord from '../../models/CpeRecord';

class CpeRecordLatestController {
    async get(req: Request, res: Response): Promise<any> {
        const erp_cpe_id = req.params.erp_cpe_id;
        console.log("herererere")
        const cpeRecord = await CpeRecord.findAll({
            where: { erp_cpe_id: erp_cpe_id, online: true },
            order: [
                ['datetime', 'DESC']
            ],
            limit: 1
        }) as any;

        if (cpeRecord.length > 0) {
            return res.json(cpeRecord[0]);
        }

        return res.json(null);
    }
}

export default new CpeRecordLatestController();
