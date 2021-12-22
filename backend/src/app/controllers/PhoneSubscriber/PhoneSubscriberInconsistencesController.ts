import { Request, Response } from "express";

import DefaultResponseMessage from "../../response_messages/default/DefaultResponseMessage";
import CheckPhoneSubscriberInconsistencesService from "../../services/PhoneSubscriber/CheckPhoneSubscriberInconsistencesService";

class PhoneSubscriberInconsistencesController {
    async index(req: Request, res: Response): Promise<any> {
        try {
            const inconsistences = await CheckPhoneSubscriberInconsistencesService.run();
            return res.json(inconsistences);
        } catch (err) {
            console.log(err);
        }

        return res
            .status(DefaultResponseMessage.internal.code)
            .json({ error: DefaultResponseMessage.internal.message });
    }
}

export default new PhoneSubscriberInconsistencesController();
