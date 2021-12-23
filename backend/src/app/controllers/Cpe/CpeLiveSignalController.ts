import { Request, Response } from "express";
import { internalErrorHandler } from "../../@exceptions/_handler/InternalErrorHandler";
import snmpagentApi from "../../services/SnmpAgentAPI/SnmpAgentApi";

class CpeLiveSignalController {
    async get(req: Request, res: Response): Promise<any> {
        try {
            const erp_cpe_id = req.params.erp_cpe_id;
            const date = Date.now();
            const { data } = await snmpagentApi.get('http://127.0.0.1:8000/snmpagent/ftth/cpe/signal?erp_cpe_id=' + erp_cpe_id);
            data.date = date;

            return res.json(data);
        } catch (error) {
            return internalErrorHandler(error, res);
        }
    }
}

export default new CpeLiveSignalController();
