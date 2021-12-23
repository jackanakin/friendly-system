import { Router } from 'express';

import CpeController from './controllers/Cpe/CpeController'
import CpeLiveSignalController from './controllers/Cpe/CpeLiveSignalController'
import CpeRecordSignalController from './controllers/CpeRecord/CpeRecordSignalController'
import CpeRecordLatestController from './controllers/CpeRecord/CpeRecordLatestController'
import SessionController from './controllers/Session/SessionController';
import ApController from './controllers/Ap/ApController';
import PhoneSubscriberController from './controllers/PhoneSubscriber/PhoneSubscriberController';
import PhoneSubscriberInconsistencesController from './controllers/PhoneSubscriber/PhoneSubscriberInconsistencesController';
import SessionValidatorMiddleware from './middlewares/SessionValidatorMiddleware';

const routes = Router();

/**
 * Public routes only
 */
routes.post('/sessions', SessionController.store);

/**
 * Authentication middleware
 */
routes.use(SessionValidatorMiddleware);
routes.delete('/sessions', SessionController.delete);

/**
 * Authenticated routes only
 */

/*routes.get('/', FeedController.index);
routes.get('/stats', StatsMonitorController.index);
routes.get('/stats/:channelPath', RealTimeStatsDetailController.index);

routes.get('/historystats', DailyStatsController.index);

routes.get('/channels', ChannelController.store);
routes.get('/channels/:channelPath', ChannelController.index);
*/

routes.get('/phone_subscriber', PhoneSubscriberController.index);
routes.get('/phone_subscriber/inconsistences', PhoneSubscriberInconsistencesController.index);

//routes.get('/ura/rating', UraReportController.index);
//routes.get('/ura/detailed', UraReportController.indexDetailed);

//routes.get('/billingcheck', BillingCheckController.index);
//routes.get('/idlesubscriber', IdleSubscriberController.index);

//routes.get('/attendancereport', AttendanceReportController.index);

//routes.get('/iptvsettings', IptvSettingsController.index);
//routes.post('/iptvintegration', IptvIntegrationController.store);
//routes.get('/apintegration', ApIntegrationController.index);

//routes.get('/sysloghistory', SyslogHistoryController.index);

routes.get('/cpe/ap/:ap_id', CpeController.index);
routes.get('/cpe/signal/:erp_cpe_id', CpeLiveSignalController.get);
routes.get('/cpe_record/latest/:erp_cpe_id', CpeRecordLatestController.get);
routes.get('/cpe_record/signal/:erp_cpe_id', CpeRecordSignalController.get);

routes.get('/ap', ApController.index);
//routes.get('/ftth/detail/:cpe_erp_cod', FtthController.findOne);
//routes.get('/ftth/detail/signal/:cpe_erp_cod', FtthController.findOneSignal);
//routes.get('/ftth/pop/index', CpeController.popsIndex);

export default routes;
