import { Request, Response } from "express";

import Cpe from '../../models/Cpe';
import CpeRecord from '../../models/CpeRecord';
import Ap from '../../models/Ap';


class CpeController {
    async findOneSignal(req: Request, res: Response): Promise<any> {
        const cpe = await Cpe.findOne({
            where: { codconexao: req.params.cpe_erp_cod }
        }) as any;

        if (cpe.olt_snmp_id && cpe.codpop) {
            return res.json({ error: "Implement it!" });
            //DJANGO
        } else {
            return res.json({ error: "Não foi possível consultar sinal!" });
        }
    }

    async findOne(req: Request, res: Response): Promise<any> {
        const cpe = await Cpe.findOne({
            where: { codconexao: req.params.cpe_erp_cod }
        }) as any;

        const latests = await CpeRecord.findAll({
            where: { cpe_id: cpe.id },
            order: [
                ['datetime', 'DESC']
            ],
            limit: 10
        });

        return res.json({ cpe, records: latests });
    }

    async index(req: Request, res: Response): Promise<any> {
        const ap_id = req.params.ap_id;
        const ap = await Ap.findByPk(ap_id) as any;

        const cpes = await Cpe.findAll({
            where: { erp_ap_id: ap.erp_id },
            order: [
                ['nap', 'ASC'],
                ['nap_port', 'ASC']
            ],
        });

        return res.json(cpes);
    }

    async popsIndex(req: Request, res: Response): Promise<any> {
        const aps = await Ap.findAll({});
        return res.json(aps);
    }
}

export default new CpeController();
