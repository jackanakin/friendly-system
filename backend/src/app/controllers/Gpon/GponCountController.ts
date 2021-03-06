import { Request, Response } from "express";
import moment from "moment";
import { Op } from "sequelize";
import { Ap, GponCount, GponIntegration } from "../../../_lib/database/main";
import GponGraphDTO, { GponGraphValues } from "../../@dto/gpon/GponGraphDTO";
import { internalErrorHandler } from "../../@exceptions/_handler/InternalErrorHandler";
import { aplhanumericalSorter } from "../../utils/sorter/IntlCollatorSorters";

class GponCountController {
    async index(req: Request, res: Response): Promise<Response<GponGraphDTO>> {
        try {
            const ap_id = req.params.ap_id as any as number;
            const ap = await Ap.findByPk(ap_id);

            const integrations = await GponIntegration.findAll({
                where: {
                    erp_ap_id: ap?.erp_id,
                },
                order: [
                    ["datetime", "DESC"]
                ],
            });

            if (integrations.length === 0) return res.json(null);
            const integrations_ids = integrations.map(x => x.id);

            const gponCount = await GponCount.findAll({
                where: {
                    gpon_integration_id: {
                        [Op.in]: integrations_ids
                    },
                    description: {
                        [Op.notLike]: "TOTAL"
                    }
                },
                order: [
                    ["gpon_integration_id", "DESC"]
                ]
            });

            gponCount.reverse();
            integrations.reverse();
            const data: GponGraphValues[] = [];
            const keys: Set<string> = new Set();

            integrations.forEach(integration => {
                let record = {
                    date: moment(integration.datetime).format("DD/MM h").toString() + "H",
                } as GponGraphValues;

                const gpon = gponCount.filter(x => x.gpon_integration_id === integration.id);
                gpon.forEach(obj => {
                    const key = obj.description;
                    record[key] = obj.online;
                    keys.add(key);
                });

                data.push(record);
            });

            return res.json({
                data: data,
                keys: Array.from(keys).sort(aplhanumericalSorter.compare)
            } as GponGraphDTO);
        } catch (error) {
            return internalErrorHandler(error, res);
        }
    }
}

export default new GponCountController();
