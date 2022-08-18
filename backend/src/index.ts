import chalk from 'chalk';

import app from './app/server';
import appConfig from "./_config/app";

try {
    app.listen(appConfig.PORT, () => {
        console.log(chalk.green.bold(
            `Started listening on ${appConfig.PORT}/http at ${new Date()} in ${appConfig.NODE_ENV} mode`
        ));
    });
} catch (err) {
    console.log(chalk.red.bold(
        `Error while starting on ${appConfig.PORT}/http at ${new Date()} in ${appConfig.NODE_ENV} mode`
    ));
    console.log(err)
}
