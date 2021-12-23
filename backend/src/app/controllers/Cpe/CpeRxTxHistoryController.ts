import { Request, Response } from "express";
import { CpeRecord } from "../../../_lib/database/main";
import { internalErrorHandler } from "../../@exceptions/_handler/InternalErrorHandler";

class CpeRxTxHistoryController {
    async get(req: Request, res: Response): Promise<any> {
        try {
            const erp_cpe_id = req.params.erp_cpe_id;

            const cpeRecords = await CpeRecord.findAll({
                where: { erp_cpe_id: erp_cpe_id },
                attributes: ['datetime', 'rx', 'tx', 'online'],
                order: [
                    ['datetime', 'DESC']
                ],
                limit: 2
            });

            return res.json(cpeRecords);
        } catch (error) {
            return internalErrorHandler(error, res);
        }
    }
}

export default new CpeRxTxHistoryController();
