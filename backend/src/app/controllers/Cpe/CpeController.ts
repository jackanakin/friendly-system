import { Request, Response } from "express";
import { Ap, Cpe, CpeRecord } from "../../../_lib/database/main";


class CpeController {
    async findOneSignal(req: Request, res: Response): Promise<any> {
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
    }

    async findOne(req: Request, res: Response): Promise<any> {
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
    }

    async index(req: Request, res: Response): Promise<any> {
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
    }

    async popsIndex(req: Request, res: Response): Promise<any> {
        const aps = await Ap.findAll({});
        return res.json(aps);
    }
}

export default new CpeController();
