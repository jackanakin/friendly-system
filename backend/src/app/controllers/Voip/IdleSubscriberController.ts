import { Request, Response } from "express";
import IdleSubscriberService from '../../services/Voip/IdleSubscriberService'

class IdleSubscriberController {
    async index(req: Request, res: Response) {
        const queryResult = await IdleSubscriberService.index()

        return res.json(queryResult)
    }
}

export default new IdleSubscriberController()
