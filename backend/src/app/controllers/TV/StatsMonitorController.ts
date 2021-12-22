import { Request, Response } from "express";

import RealTimeStats from '../../schemas/RealTimeStats';
import Channel from '../../schemas/Channel';

class StatsMonitorController {
  async index(req: Request, res: Response) {
    const channels = await Channel.find({}).sort('title');
    const firstStat = await RealTimeStats.find({})
      .sort('-date')
      .limit(1);

    if (!firstStat || firstStat.length == 0) {
      return res.json([]);
    }

    const stats = await RealTimeStats.find({ date: firstStat[0].date }).sort(
      'title'
    );
    const results = [];

    channels.forEach(channel => {
      const stat = stats.find(el => {
        return el._path === channel._path;
      });

      results.push({
        channel,
        clients: stat ? stat.clients : [],
        date: firstStat[0].date,
      });
    });

    return res.json(results);
  }
}

export default new StatsMonitorController();
