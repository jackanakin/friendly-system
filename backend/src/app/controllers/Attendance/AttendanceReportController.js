import { format, parseISO } from 'date-fns'

import AttendanceReportService from '../../services/Attendance/AttendanceReportService'

class AttendanceReportController {
    async index(req, res) {
        const { startPeriod, endPeriod } = req.query;
        const formattedStartPeriod = format(parseISO(startPeriod), 'yyyy-MM-dd')
        const formattedEndPeriod = format(parseISO(endPeriod), 'yyyy-MM-dd')

        const queryResult = await AttendanceReportService.index(formattedStartPeriod, formattedEndPeriod)

        return res.json(queryResult)
    }
}

export default new AttendanceReportController()
