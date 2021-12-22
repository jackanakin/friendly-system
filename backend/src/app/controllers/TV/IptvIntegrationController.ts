import { Request, Response } from "express";

import ChannelService from '../../services/Integration/ChannelService'
import IptvSettingsService from '../../services/Integration/IptvSettingsService'

class IptvIntegrationController {
    async store(req: Request, res: Response) {
        const { iptvUrl } = req.body;
        const url = await IptvSettingsService.updateUrl(iptvUrl)
        const result = await ChannelService.create(url);

        return res.json(url);
    }
}

export default new IptvIntegrationController();
