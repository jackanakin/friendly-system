import { Request, Response } from "express";

import IntegrationSettings from '../../models/IntegrationSettings'

class IptvSettingsController {
  async index(req: Request, res: Response) {
    let iptv_url_setting = await IntegrationSettings.findOne({
      where: { name: "iptv_url" }
    });

    if (!iptv_url_setting) {
      iptv_url_setting = await IntegrationSettings.create({
        name: "iptv_url", value: ""
      });
    }

    return res.json(iptv_url_setting.value);
  }
}

export default new IptvSettingsController();
