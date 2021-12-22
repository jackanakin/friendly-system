import { Request, Response } from "express";

import CpeRecord from '../../models/CpeRecord';

class CpeRecordSignalController {
    async get(req: Request, res: Response): Promise<any> {
        const erp_cpe_id = req.params.erp_cpe_id;

        const cpeRecords = await CpeRecord.findAll({
            where: { erp_cpe_id: erp_cpe_id },
            attributes: ['datetime', 'rx', 'tx', 'online'],
            order: [
                ['datetime', 'DESC']
            ],
            limit: 2
        }) as any;

        return res.json(cpeRecords);
    }
}

export default new CpeRecordSignalController();
