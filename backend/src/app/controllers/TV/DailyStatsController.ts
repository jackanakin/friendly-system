import { Request, Response } from "express";
import { parseISO, format } from 'date-fns';

import DailyStats from '../../schemas/DailyStats';
import DailyStatsHourSorter from '../../utils/sorter/DailyStatsHourSorter';

class DailyStatsController {
  async index(req: Request, res: Response) {
    const { date, channelPath } = req.query;
    const parsedDate = format(parseISO(date), 'yyyy-MM-dd');

    const data = await DailyStats.find({
      date: parsedDate,
      _path: channelPath,
    });

    if (data.length > 0) {
      const dataPoints = data[0].audience_graph_data.sort(DailyStatsHourSorter);
      return res.json(dataPoints);
    } else {
      return res.json([]);
    }
  }
}

export default new DailyStatsController();
