import { startOfDay, endOfDay, parseISO } from 'date-fns';
import Messages from '../../schemas-syslog/Messages'

class SyslogHistoryController {
    async index(req, res) {
        const { startPeriod, endPeriod, origin } = req.query;
        const filter = {}

        if (startPeriod && endPeriod) {
            filter.date = {
                $gte: startOfDay(parseISO(startPeriod)),
                $lte: endOfDay(parseISO(endPeriod)),
            }
        }
        if (origin){
            filter.origin = origin
        }

        const messages = await Messages.find(filter).sort('-date');
        return res.json(messages);
    }
}

export default new SyslogHistoryController();
