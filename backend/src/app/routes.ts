import { Router } from 'express';

import CpeController from './controllers/Cpe/CpeController'
import SessionController from './controllers/Session/SessionController';
import ApController from './controllers/Ap/ApController';
import PhoneSubscriberController from './controllers/PhoneSubscriber/PhoneSubscriberController';
import PhoneSubscriberInconsistencesController from './controllers/PhoneSubscriber/PhoneSubscriberInconsistencesController';
import SessionValidatorMiddleware from './middlewares/SessionValidatorMiddleware';
import CpeRxTxHistoryController from './controllers/Cpe/CpeRxTxHistoryController';
import CpeRxTxActualController from './controllers/Cpe/CpeRxTxActualController';
import CpeDetailsController from './controllers/Cpe/CpeDetailsController';

const routes = Router();

/**
 * Public routes only
 */
routes.post('/sessions', SessionController.store);

/**
 * Authentication middleware
 */
routes.use(SessionValidatorMiddleware);

/**
 * Authenticated routes only
 */

routes.delete('/sessions', SessionController.delete);
routes.get('/phone_subscriber', PhoneSubscriberController.index);
routes.get('/phone_subscriber/inconsistences', PhoneSubscriberInconsistencesController.index);


routes.get('/cpe/:ap_id', CpeController.index);
routes.get('/cpe/details/:erp_cpe_id', CpeDetailsController.get);
routes.get('/cpe/txrx/history/:erp_cpe_id', CpeRxTxHistoryController.get);
routes.get('/cpe/txrx/actual/:erp_cpe_id', CpeRxTxActualController.get);

routes.get('/ap', ApController.index);

export default routes;
