import { Request, Response } from "express";
import { format, parseISO } from 'date-fns'

import BillingCheckService from '../../services/Voip/BillingCheckService'

class BillingCheckController {
    async index(req: Request, res: Response) {
        const { date } = req.query;
        const period = format(parseISO(date), 'MMyyyy')
        const queryResult = await BillingCheckService.index(period)

        let uuid = 0;
        const result = queryResult.map(bill => {
            uuid++;
            return { ...bill, uuid, accessionFormated: format(parseISO(bill.accession), 'MMyyyy') }
        })

        return res.json(result)
    }
}

export default new BillingCheckController()
