import { Request, Response } from "express";

import Channel from '../../schemas/Channel';
import ChannelService from '../../services/Integration/ChannelService';

class ChannelController {
  async store(req: Request, res: Response) {
    const result = await ChannelService.create();
    return res.json(result);
  }

  async index(req: Request, res: Response) {
    const channel = await Channel.findOne({ _path: req.params.channelPath });
    return res.json(channel);
  }
}

export default new ChannelController();
