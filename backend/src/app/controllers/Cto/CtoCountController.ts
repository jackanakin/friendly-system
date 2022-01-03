import { Request, Response } from "express";
import moment from "moment";
import { Op } from "sequelize";
import { Ap, CtoCount, GponIntegration } from "../../../_lib/database/main";
import CtoGraphDTO, { CtoGraphValues } from "../../@dto/cto/CtoGraphDTO";
import { internalErrorHandler } from "../../@exceptions/_handler/InternalErrorHandler";
import { aplhanumericalSorter } from "../../utils/sorter/IntlCollatorSorters";

class CtoCountController {
    async index(req: Request, res: Response): Promise<Response<CtoGraphDTO[]>> {
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

            if (integrations.length === 0) return res.json([]);
            const integrations_ids = integrations.map(x => x.id);

            const ctoCount = await CtoCount.findAll({
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

            const result: CtoGraphDTO[] = [];

            ctoCount.reverse();
            integrations.reverse();

            integrations.forEach(integration => {
                const ctos = ctoCount.filter(x => x.gpon_integration_id === integration.id);

                ctos.forEach(cto => {
                    const ctoName = cto.description.toUpperCase();
                    const popName = ctoName.slice(0, 3);
                    const ponNumber = ctoName.split(`${popName}-CTO-1-`)[1].split("-")[0];
                    const ponName = `PON${ponNumber}`;

                    const key = ctoName;
                    const value = cto.online;

                    const ctoGraphDto = result.find(x => x.ponName === ponName);
                    if (!ctoGraphDto) {
                        const record = {
                            date: moment(integration.datetime).format("DD/MM h").toString() + "H",
                        } as CtoGraphValues;

                        record[key] = value;
                        const keys: string[] = [];
                        keys.push(key);

                        let data: CtoGraphValues[] = [];
                        data.push(record);

                        const newCtoGraphDto = {
                            ponName, keys, data
                        } as CtoGraphDTO;

                        result.push(newCtoGraphDto);
                    } else {
                        const record = {
                            date: moment(integration.datetime).format("DD/MM h").toString() + "H",
                        } as CtoGraphValues;

                        let xAxis = ctoGraphDto.data.find(x => x.date === record.date);
                        if (xAxis) {
                            xAxis[ctoName] = value;
                            const keyExist = ctoGraphDto.keys.find(x => x === key);
                            if (!keyExist) ctoGraphDto.keys.push(key);
                        } else {
                            record[key] = value;

                            const keyExist = ctoGraphDto.keys.find(x => x === key);
                            if (!keyExist) ctoGraphDto.keys.push(key);

                            ctoGraphDto.data.push(record);
                        }
                    }
                });
            });

            result.forEach(dto => {
                dto.keys = dto.keys.sort(aplhanumericalSorter.compare)
            });

            return res.json(result);
        } catch (error) {
            return internalErrorHandler(error, res);
        }
    }
}

export default new CtoCountController();
