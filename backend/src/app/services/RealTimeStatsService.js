import { format, subMinutes } from 'date-fns';
import axios from 'axios';

import Feed from '../schemas/Feed';
import RealTimeStats from '../schemas/RealTimeStats';
import Channel from '../schemas/Channel';
import ChannelAvailability from '../schemas/ChannelAvailability';

class RealTimeStatsService {
  async createAvailability() {
    try {
      const nowDate = new Date();
      console.log('createAvailability:start=' + nowDate);

      const delayedDate = subMinutes(nowDate, 1);
      const formattedDate = format(delayedDate, "yyyy-MM-dd'T'HH:mm");

      const channels = await Channel.find({});

      const channelAvailability = await Promise.all(
        channels.map(async channel => {
          try {
            const url = `${channel._url.substring(
              0,
              channel._url.lastIndexOf('/')
            )}:82${channel._url.substring(channel._url.lastIndexOf('/'))}`;

            const { data } = await axios.get(url);

            const sequence = data.substring(
              data.indexOf('#EXT-X-MEDIA-SEQUENCE:') +
                '#EXT-X-MEDIA-SEQUENCE:'.length,
              data.indexOf('#EXTINF:')
            );

            const numericSequence = Number(sequence);

            if (!channel.current_sequence) {
              channel.current_sequence = numericSequence;
              channel.current_status = 1;
            } else if (numericSequence == channel.current_sequence) {
              channel.current_status = 0;
            } else {
              channel.current_sequence = numericSequence;
              channel.current_status = 1;
            }
          } catch (err) {
            channel.current_status = 0;
          } finally {
            await Channel.findByIdAndUpdate(
              channel._id,
              {
                current_status: channel.current_status,
                current_sequence: channel.current_sequence,
              },
              {
                new: false,
              }
            );

            return {
              _path: channel._path,
              status: channel.current_status,
              date: formattedDate,
            };
          }
        })
      );

      await ChannelAvailability.create(channelAvailability);
    } catch (err) {
      console.log(err);
    }

    console.log('createAvailability:end=' + new Date());
    return;
  }

  async createAudienceStats() {
    try {
      const nowDate = new Date();
      console.log('createAudienceStats:start=' + nowDate);

      const delayedDate = subMinutes(nowDate, 1);
      const formattedDate = format(delayedDate, "yyyy-MM-dd'T'HH:mm");

      const channels = await Channel.find({});
      const statsArray = channels.map(channel => {
        return {
          _path: channel._path,
          clients: [],
          date: formattedDate,
          audience: 0,
          read: false,
        };
      });

      const feeds = await Feed.find({
        date: {
          $gte: delayedDate,
          $lte: nowDate,
        },
      });

      feeds.forEach(feed => {
        const insideArray = statsArray.find(function(inside) {
          return feed.client_req.includes(inside._path);
        });

        if (insideArray) {
          if (!insideArray.clients.includes(feed.client_src)) {
            insideArray.clients.push(feed.client_src);
            insideArray.audience++;
          }
        } else {
          console.log(
            'RealTimeStatsService createAudienceStats, no channel found for:',
            feed
          );
        }
      });

      await RealTimeStats.create(statsArray);
    } catch (err) {
      console.log(err);
    }

    console.log('createAudienceStats:end=' + new Date());
    return;
  }
}

export default new RealTimeStatsService();
