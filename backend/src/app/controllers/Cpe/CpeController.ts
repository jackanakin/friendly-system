import { Request, Response } from "express";
import { Ap, Cpe, CpeRecord } from "../../../_lib/database/main";
import { internalErrorHandler } from "../../@exceptions/_handler/InternalErrorHandler";

class CpeController {
    async findOneSignal(req: Request, res: Response): Promise<any> {
        try {
            const cpe_id = req.params.cpe_erp_cod as any as number;
            const cpe = await Cpe.findOne({
                where: { erp_cpe_id: cpe_id }
            }) as any;

            if (cpe.olt_snmp_id && cpe.codpop) {
                return res.json({ error: "Implement it!" });
                //DJANGO
            } else {
                return res.json({ error: "Não foi possível consultar sinal!" });
            }
        } catch (error) {
            return internalErrorHandler(error, res);
        }
    }

    async findOne(req: Request, res: Response): Promise<any> {
        try {
            const cpe_id = req.params.cpe_erp_cod as any as number;

            const cpe = await Cpe.findOne({
                where: { erp_cpe_id: cpe_id }
            }) as any;

            const latests = await CpeRecord.findAll({
                where: { erp_cpe_id: cpe.id },
                order: [
                    ['datetime', 'DESC']
                ],
                limit: 10
            });

            return res.json({ cpe, records: latests });
        } catch (error) {
            return internalErrorHandler(error, res);
        }
    }

    async index(req: Request, res: Response): Promise<any> {
        try {
            const ap_id = req.params.ap_id as any as number;
            const ap = await Ap.findByPk(ap_id);

            const cpes = ap ? await Cpe.findAll({
                where: { erp_ap_id: ap.erp_id },
                order: [
                    ['nap', 'ASC'],
                    ['nap_port', 'ASC']
                ],
            }) : null;

            return res.json(cpes);
        } catch (error) {
            return internalErrorHandler(error, res);
        }
    }

    async popsIndex(req: Request, res: Response): Promise<any> {
        try {
            const aps = await Ap.findAll({});
            return res.json(aps);
        } catch (error) {
            return internalErrorHandler(error, res);
        }
    }
}

export default new CpeController();
