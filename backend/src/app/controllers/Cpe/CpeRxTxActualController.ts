import { Request, Response } from "express";

import snmpApi from "../../../_lib/snmp/snmpApi";
import { internalErrorHandler } from "../../@exceptions/_handler/InternalErrorHandler";

class CpeRxTxActualController {
    async get(req: Request, res: Response): Promise<any> {
        try {
            const erp_cpe_id = req.params.erp_cpe_id;
            const date = Date.now();
            const { data } = await snmpApi.get(`ftth/cpe/signal?erp_cpe_id=${erp_cpe_id}`);
            data.date = date;

            return res.json(data);
        } catch (error) {
            return internalErrorHandler(error, res);
        }
    }
}

export default new CpeRxTxActualController();
