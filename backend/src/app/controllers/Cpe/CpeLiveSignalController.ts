import { Request, Response } from "express";
import snmpagentApi from "../../services/SnmpAgentAPI/SnmpAgentApi";

class CpeLiveSignalController {
    async get(req: Request, res: Response): Promise<any> {
        try {
            const erp_cpe_id = req.params.erp_cpe_id;
            const date = Date.now();
            const { data } = await snmpagentApi.get('http://127.0.0.1:8000/snmpagent/ftth/cpe/signal?erp_cpe_id=' + erp_cpe_id);
            data.date = date;

            return res.json(data);
        } catch (err: any) {
            console.log("CpeLiveSignalController:get:exception");
            console.log(String(err));
        }

        return res.json({error: "Internal error"}).status(500);
    }
}

export default new CpeLiveSignalController();
