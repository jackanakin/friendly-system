import { format, isSameHour, isSameDay } from 'date-fns';

import Channel from '../schemas/Channel';
import RealTimeStats from '../schemas/RealTimeStats';
import DailyStats from '../schemas/DailyStats';

class DailyStatsService {
  async createDailyStats() {
    const now = new Date();
    const channels = await Channel.find({});

    for (let channel of channels) {
      const channelPath = channel._path;
      const realTimeStats = await RealTimeStats.aggregate([
        {
          $match: {
            _path: channelPath,
            read: false,
          },
        },
        { $project: { _id: 1, date: 1, audience: 1, _path: 1 } },
      ]).sort('date');

      let audienceSum = 0;
      let statSum = 0;

      let lastHour = realTimeStats[0].date;
      let graphData = [];

      let dailyStatMap = new Map();
      let realTimeStatsToUpdateReadFlag = [];

      realTimeStats.every(stat => {
        if (!isSameDay(stat.date, lastHour)) {
          const totalAudience = audienceSum / statSum;
          const accurace = statSum / 60;

          graphData.push({
            hour: Number(format(lastHour, 'HH')),
            avg: Math.round(totalAudience),
            acc: accurace,
          });
          dailyStatMap.set(format(lastHour, 'yyyy-MM-dd'), graphData);

          graphData = [];
          lastHour = stat.date;
          audienceSum = 0;
          statSum = 0;
        }

        if (!isSameHour(lastHour, stat.date)) {
          const totalAudience = audienceSum / statSum;
          const accurace = statSum / 60;

          graphData.push({
            hour: Number(format(lastHour, 'HH')),
            avg: Math.round(totalAudience),
            acc: accurace,
          });

          lastHour = stat.date;
          audienceSum = 0;
          statSum = 0;
        }

        if (isSameHour(stat.date, now)) {
          if (statSum > 0) {
            const totalAudience = audienceSum / statSum;
            const accurace = statSum / 60;

            graphData.push({
              hour: Number(format(lastHour, 'HH')),
              avg: Math.round(totalAudience),
              acc: accurace,
            });
          }
          return false;
        }

        audienceSum += stat.audience;
        statSum++;

        realTimeStatsToUpdateReadFlag.push(stat._id);
        return true;
      });

      if (graphData.length > 0) {
        dailyStatMap.set(format(lastHour, 'yyyy-MM-dd'), graphData);
      }

      for (let [key, value] of dailyStatMap.entries()) {
        const existentDailyStatsGraph = await DailyStats.find({
          date: key,
          _path: channelPath,
        });
        if (existentDailyStatsGraph.length == 0) {
          await DailyStats.create({
            _path: channelPath,
            date: key,
            audience_graph_data: value,
          });
        } else {
          const audience_graph_data = existentDailyStatsGraph[0].audience_graph_data.concat(
            value
          );
          await DailyStats.findByIdAndUpdate(
            {
              _id: existentDailyStatsGraph[0]._id,
            },
            {
              audience_graph_data,
            }
          );
        }
      }

      await RealTimeStats.updateMany(
        {
          _id: {
            $in: realTimeStatsToUpdateReadFlag,
          },
        },
        {
          read: true,
        }
      );
    }
    return null;
  }
}

export default new DailyStatsService();
