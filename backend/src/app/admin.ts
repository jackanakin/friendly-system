import 'dotenv/config';
import yargs from "yargs";
import readline from "readline";

import appConfig from '../_config/app';
import '../_lib/database/main';

import UserService from "./services/UserService";
import CreateUserDTO from './@dto/user/CreateUserDTO';

const userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
}) as any;

// custom version
yargs.version('1.0.1');

// add command
yargs.command({
    command: 'adduser',
    describe: 'Adicionar novo usuário',
    builder: {
        name: {
            describe: 'Nome do usuário',
            type: 'string',
            demand: true
        },
        email: {
            describe: 'E-mail do usuário',
            type: 'string',
            demand: true
        }
    },
    async handler(argv) {
        const name = argv.name;
        const email = argv.email;

        userInput.stdoutMuted = true;
        userInput.query = `Senha para ${email}:`;

        userInput.question(userInput.query, async (password: string) => {
            const user = { name, email, password } as CreateUserDTO;
            console.log(`\nAdicionando o usuário ${user.email}`);
            const res = await UserService.createUser(user);
            console.log(res);

            userInput.close();
        });

        userInput._writeToOutput = function _writeToOutput(stringToWrite: string) {
            if (userInput.stdoutMuted)
                userInput.output.write("*");
            else
                userInput.output.write(stringToWrite);
        };
    }
});

// delete command
yargs.command({
    command: 'deluser',
    describe: 'Removendo usuário',
    builder: {
        email: {
            describe: 'E-mail do usuário',
            type: 'string',
            demand: true
        }
    },
    async handler(argv) {
        const email = argv.email as string;
        const res = await UserService.removeUser(email);
        console.log(res);
    }
});

// end of file
yargs.parse();