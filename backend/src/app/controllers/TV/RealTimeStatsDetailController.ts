import { Request, Response } from "express";
import { startOfDay, endOfDay } from 'date-fns';

import RealTimeStats from '../../schemas/RealTimeStats';

class RealTimeStatsDetailController {
  async index(req: Request, res: Response) {
    const stats = await RealTimeStats.find({
      date: {
        $gte: startOfDay(new Date()),
        $lte: endOfDay(new Date()),
      },
      _path: req.params.channelPath,
    }).sort('-date');

    return res.json(stats);
  }
}

export default new RealTimeStatsDetailController();
