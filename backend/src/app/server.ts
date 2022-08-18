import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import appConfig from '../_config/app';

import '../_lib/database/main';

import routes from './routes';
import LoggingMiddleware from './middlewares/LoggingMiddleware';

class App {
  server: express.Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors({ origin: appConfig.WEB_URL, credentials: true }));
    this.server.use(express.json());
    this.server.use(LoggingMiddleware);
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
