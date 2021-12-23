import { Request, Response } from "express";
import PhoneSubscriberTS from "../../../@types/models/PhoneSubscriber";
import CpeWithLatestCpeRecordDTO from "../../../@types/services/phone_subscriber/CpeWithLatestCpeRecordDTO";
import { PhoneSubscriber } from "../../../_lib/database/main";

import DefaultResponseMessage from "../../response_messages/default/DefaultResponseMessage";
import GetCompletePhoneSubscriberInfoService from "../../services/PhoneSubscriber/GetCompletePhoneSubscriberInfoService";

class PhoneSubscriberController {
    async index(req: Request, res: Response): Promise<any> {
        try {
            const phoneSubscribers = await PhoneSubscriber.findAll({
                order: [
                    ['erp_contract_id', 'ASC']
                ]
            }) as any as PhoneSubscriberTS[];

            if (phoneSubscribers.length > 0) {
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
            }

        } catch (err) {
            console.log(err);
        }

        return res
            .status(DefaultResponseMessage.internal.code)
            .json({ error: DefaultResponseMessage.internal.message });
    }
}

export default new PhoneSubscriberController();
