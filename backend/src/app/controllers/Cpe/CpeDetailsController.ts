import { Request, Response } from "express";
import { CpeRecord } from "../../../_lib/database/main";
import { internalErrorHandler } from "../../@exceptions/_handler/InternalErrorHandler";

class CpeRecordLatestController {
    async get(req: Request, res: Response): Promise<any> {
        try {
            const erp_cpe_id = req.params.erp_cpe_id;

            const cpeRecord = await CpeRecord.findAll({
                where: { erp_cpe_id: erp_cpe_id, online: true },
                order: [
                    ['datetime', 'DESC']
                ],
                limit: 1
            });

            if (cpeRecord.length > 0) {
                return res.json(cpeRecord[0]);
            }

            return res.json(null);
        } catch (error) {
            return internalErrorHandler(error, res);
        }
    }
}

export default new CpeRecordLatestController();
