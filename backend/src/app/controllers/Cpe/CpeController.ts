import { Request, Response } from "express";
import { Ap, Cpe, CpeRecord } from "../../../_lib/database/main";
import { internalErrorHandler } from "../../@exceptions/_handler/InternalErrorHandler";

class CpeController {
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
}

export default new CpeController();
