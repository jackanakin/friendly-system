import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface CpeAttributes {
    id: number;
    erp_cpe_id: number;
    erp_ap_id: number;
    erp_contract_id: number;

    name: string;
    username: string;
    device_password: string;
    mac_address: string;
    onu_serial: string;
    nap: string;
    nap_port: number;
    technology: string;
    cadastrado: string;
    observation: string;
    address_list: string;

    online: boolean;
    integration_updated: boolean;
    olt_matched: boolean;

    last_firmware_version: string;
    last_hardware_version: string;
    last_online: boolean;
    last_onu_serial: string;
    last_onu_type: number;
    last_pon_index: string;
    last_rx: number;
    last_snmp_index: number;
    last_tx: number;
    last_software_version: string;
}
export interface CpeModel extends Model<CpeAttributes>, CpeAttributes { }

export type CpeStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): CpeModel;
};

export function CpeFactory(sequelize: Sequelize): CpeStatic {
    return <CpeStatic>sequelize.define("cpe", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        erp_cpe_id: {
            type: DataTypes.INTEGER,
        },
        erp_ap_id: {
            type: DataTypes.INTEGER,
        },
        erp_contract_id: {
            type: DataTypes.INTEGER,
        },

        name: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
        },
        device_password: {
            type: DataTypes.STRING,
        },
        mac_address: {
            type: DataTypes.STRING,
        },
        onu_serial: {
            type: DataTypes.STRING,
        },
        nap: {
            type: DataTypes.STRING,
        },
        nap_port: {
            type: DataTypes.INTEGER,
        },
        technology: {
            type: DataTypes.STRING,
        },
        cadastrado: {
            type: DataTypes.STRING,
        },
        observation: {
            type: DataTypes.STRING,
        },
        address_list: {
            type: DataTypes.STRING,
        },

        online: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        integration_updated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        olt_matched: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        last_firmware_version: {
            type: DataTypes.STRING,
        },
        last_hardware_version: {
            type: DataTypes.STRING,
        },
        last_online: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        last_onu_serial: {
            type: DataTypes.STRING,
        },
        last_onu_type: {
            type: DataTypes.INTEGER,
        },
        last_pon_index: {
            type: DataTypes.STRING,
        },
        last_rx: {
            type: DataTypes.INTEGER,
        },
        last_snmp_index: {
            type: DataTypes.INTEGER,
        },
        last_tx: {
            type: DataTypes.INTEGER,
        },
        last_software_version: {
            type: DataTypes.STRING,
        },

    }, { tableName: "cpe", timestamps: false });
}
