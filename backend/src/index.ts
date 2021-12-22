import chalk from 'chalk';

import { NodeEnv } from './@types/env/NodeEnv';
import app from './app';
import appConfig from "./_config/app";

try {
    if (appConfig.NODE_ENV === NodeEnv.DEVELOPMENT) {
        app.listen(appConfig.DEVELOPMENT_PORT, () => {
            console.log(chalk.green.bold(
                `Started listening on ${appConfig.DEVELOPMENT_PORT}/http at ${new Date()} in ${appConfig.NODE_ENV} mode`
            ));
        });
    }
} catch (err) {
    console.log(chalk.red.bold(
        `Error while starting on ${appConfig.DEVELOPMENT_PORT}/http at ${new Date()} in ${appConfig.NODE_ENV} mode`
    ));
}
