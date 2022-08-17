import { Router } from 'express';

import CpeController from './controllers/Cpe/CpeController'
import GponCountController from './controllers/Gpon/GponCountController'
import SessionController from './controllers/Session/SessionController';
import ApController from './controllers/Ap/ApController';
import PhoneSubscriberController from './controllers/PhoneSubscriber/PhoneSubscriberController';
import SessionValidatorMiddleware from './middlewares/SessionValidatorMiddleware';
import CpeRxTxHistoryController from './controllers/Cpe/CpeRxTxHistoryController';
import CpeRxTxActualController from './controllers/Cpe/CpeRxTxActualController';
import CpeDetailsController from './controllers/Cpe/CpeDetailsController';
import GponTxAverageController from './controllers/Gpon/GponTxAverageController';
import GponRxAverageController from './controllers/Gpon/GponRxAverageController';
import CtoCountController from './controllers/Cto/CtoCountController';
import CtoRxAverageController from './controllers/Cto/CtoRxAverageController';
import CtoTxAverageController from './controllers/Cto/CtoTxAverageController';
import UserController from './controllers/User/UserController';

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

routes.post('/user', UserController.store)

routes.get('/phone_subscriber', PhoneSubscriberController.index);

routes.get('/cto/count/:ap_id', CtoCountController.index);
routes.get('/cto/rxaverage/:ap_id', CtoRxAverageController.index);
routes.get('/cto/txaverage/:ap_id', CtoTxAverageController.index);
routes.get('/gpon/count/:ap_id', GponCountController.index);
routes.get('/gpon/txaverage/:ap_id', GponTxAverageController.index);
routes.get('/gpon/rxaverage/:ap_id', GponRxAverageController.index);

routes.get('/cpe/:ap_id', CpeController.index);
routes.get('/cpe/details/:erp_cpe_id', CpeDetailsController.get);
routes.get('/cpe/txrx/history/:erp_cpe_id', CpeRxTxHistoryController.get);
routes.get('/cpe/txrx/actual/:erp_cpe_id', CpeRxTxActualController.get);

routes.get('/ap', ApController.index);

export default routes;
