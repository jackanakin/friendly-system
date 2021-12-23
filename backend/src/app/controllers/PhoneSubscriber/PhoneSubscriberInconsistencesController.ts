import { Request, Response } from "express";

import { internalErrorHandler } from "../../@exceptions/_handler/InternalErrorHandler";
import CheckPhoneSubscriberInconsistencesService from "../../services/PhoneSubscriber/CheckPhoneSubscriberInconsistencesService";

class PhoneSubscriberInconsistencesController {
    async index(req: Request, res: Response): Promise<any> {
        try {
            const inconsistences = await CheckPhoneSubscriberInconsistencesService.run();
            return res.json(inconsistences);
        } catch (error) {
            return internalErrorHandler(error, res);
        }
    }
}

export default new PhoneSubscriberInconsistencesController();
