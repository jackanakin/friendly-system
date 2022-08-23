import { CommandModule } from "yargs";
import readline from "readline";

import CreateUserDTO from "../../app/@dto/user/CreateUserDTO";
import UserService from "../../app/services/UserService";

const userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
}) as any;

export const addUser = {
    command: 'add-user',
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
            const res = await UserService.create(user);
            console.log(res);

            userInput.close();
            process.exit(1);
        });

        userInput._writeToOutput = function _writeToOutput(stringToWrite: string) {
            if (userInput.stdoutMuted)
                userInput.output.write("*");
            else
                userInput.output.write(stringToWrite);
        };
    }
} as CommandModule;

export const delUser = {
    command: 'del-user',
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
        const res = await UserService.remove(email);
        console.log(res);
        process.exit(1);
    }
} as CommandModule;

export const listUser = {
    command: 'list-user',
    describe: 'Listando usuários',
    async handler(argv) {
        const res = await UserService.list();
        console.log(res);
        process.exit(1);
    }
} as CommandModule;