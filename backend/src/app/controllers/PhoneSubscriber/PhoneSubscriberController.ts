import { Request, Response } from "express";

import CpeWithLatestCpeRecordDTO from "../../../@types/dto/services/PhoneSubscriber/CpeWithLatestCpeRecordDTO";
import { PhoneSubscriber } from "../../../_lib/database/main";
import { internalErrorHandler } from "../../@exceptions/_handler/InternalErrorHandler";
import GetCompletePhoneSubscriberInfoService from "../../services/PhoneSubscriber/GetCompletePhoneSubscriberInfoService";

class PhoneSubscriberController {
    async index(req: Request, res: Response): Promise<any> {
        try {
            const phoneSubscribers = await PhoneSubscriber.findAll({
                order: [
                    ['erp_contract_id', 'ASC']
                ]
            });

            const subscribers_info = await GetCompletePhoneSubscriberInfoService.all();
            phoneSubscribers.forEach(ps => {
                let found = false;
                subscribers_info.forEach(ps_extended => {
                    if (ps.phone_number === ps_extended.phone_number) {
                        found = true;
                    }
                });

                if (!found) {
                    subscribers_info.push(ps as any as CpeWithLatestCpeRecordDTO);
                }
            });

            // check records that doesn't have match
            return res.json(subscribers_info);
        } catch (error) {
            return internalErrorHandler(error, res);
        }
    }
}

export default new PhoneSubscriberController();
