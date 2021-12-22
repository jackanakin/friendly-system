import { CronJob } from 'cron';

import RealTimeStatsService from '../app/services/RealTimeStatsService';
import DailyStatsService from '../app/services/DailyStatsService';

export default function jobs() {
  createAudienceStats();
  createAvailability();
  createDailyStats();
}

function createAudienceStats() {
  new CronJob(
    '* * * * *',
    function() {
      RealTimeStatsService.createAudienceStats();
    },
    null,
    true,
    'America/Sao_Paulo'
  );
}

function createAvailability() {
  new CronJob(
    '* * * * *',
    function() {
      RealTimeStatsService.createAvailability();
    },
    null,
    true,
    'America/Sao_Paulo'
  );
}

function createDailyStats() {
  new CronJob(
    '5 * * * *',
    function() {
      DailyStatsService.createDailyStats();
    },
    null,
    true,
    'America/Sao_Paulo'
  );
}
