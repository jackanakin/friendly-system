import { CommandModule } from "yargs";

import CreateApDTO from "../../app/@dto/ap/CreateApDTO";
import ApService from "../../app/services/ApService";

export const addAp = {
    command: 'add-ap',
    describe: 'Adicionar novo Acess Point',
    builder: {
        cod_mk: {
            describe: 'Código no MK',
            type: 'number',
            demand: true
        },
        nome_mk: {
            describe: 'Nome no mk',
            type: 'string',
            demand: true
        },
        ip: {
            describe: 'Endereço IP',
            type: 'string',
            demand: true
        },
        snmp_port: {
            describe: 'Porta SNMP',
            type: 'number',
            demand: true
        },
        snmp_community: {
            describe: 'Comunidade SNMP',
            type: 'string',
            demand: true
        },
        vlan: {
            describe: 'Número da VLAN de dados',
            type: 'string',
            demand: true
        }
    },
    async handler(argv) {
        const cod_mk = argv.cod_mk as number;
        const nome_mk = argv.nome_mk as string;
        const ip = argv.ip as string;
        const snmp_port = argv.snmp_port as number;
        const snmp_community = argv.snmp_community as string;
        const vlan = argv.vlan as string;

        console.log(`Adicionando ${nome_mk}:`);

        const ap = { cod_mk, nome_mk, ip, snmp_port, snmp_community, vlan } as CreateApDTO;
        const res = await ApService.create(ap);
        console.log(res);

        process.exit(1);
    }
} as CommandModule;

export const delAp = {
    command: 'del-ap',
    describe: 'Removendo Access Point',
    builder: {
        cod_mk: {
            describe: 'Código no MK',
            type: 'number',
            demand: true
        },
    },
    async handler(argv) {
        const cod_mk = argv.cod_mk as number;
        const res = await ApService.remove(cod_mk);
        console.log(res);
        process.exit(1);
    }
} as CommandModule;

export const disableAp = {
    command: 'disable-ap',
    describe: 'Desativar Access Point',
    builder: {
        cod_mk: {
            describe: 'Código no MK',
            type: 'number',
            demand: true
        },
    },
    async handler(argv) {
        const cod_mk = argv.cod_mk as number;
        const res = await ApService.disable(cod_mk);
        console.log(res);
        process.exit(1);
    }
} as CommandModule;

export const enableAp = {
    command: 'enable-ap',
    describe: 'Ativar Access Point',
    builder: {
        cod_mk: {
            describe: 'Código no MK',
            type: 'number',
            demand: true
        },
    },
    async handler(argv) {
        const cod_mk = argv.cod_mk as number;
        const res = await ApService.enable(cod_mk);
        console.log(res);
        process.exit(1);
    }
} as CommandModule;

export const listAp = {
    command: 'list-ap',
    describe: 'Listar Access Point(s)',
    builder: {},
    async handler(argv) {
        const res = await ApService.list();
        console.log("Lista de Access Point:")
        console.log(res);
        process.exit(1);
    }
} as CommandModule;