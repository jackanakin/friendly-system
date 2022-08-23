import 'dotenv/config';
import yargs from "yargs";

import { addAp, delAp, disableAp, enableAp, listAp } from './commands/ApCommands';
import { addUser, delUser, listUser } from './commands/UserCommands';

// custom version
yargs.version('1.0.0');

// user commands
yargs.command(addUser);
yargs.command(delUser);
yargs.command(listUser);

// aps commands
yargs.command(addAp);
yargs.command(delAp);
yargs.command(disableAp);
yargs.command(enableAp);
yargs.command(listAp);

// end of file
yargs.parse();
