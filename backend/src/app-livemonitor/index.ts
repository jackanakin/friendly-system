import 'dotenv/config';
import express from 'express';

import '../_config/database/iptv';

import liveMonitorJobs from './jobs';

class LiveMonitorApp {
  server: express.Application;

  constructor() {
    this.server = express();
    liveMonitorJobs();
  }
}

export default new LiveMonitorApp().server;
