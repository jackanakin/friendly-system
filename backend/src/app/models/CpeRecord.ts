import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface CpeRecordAttributes {
    id: number;
    erp_cpe_id: number;
    erp_ap_id: number;
    online: boolean;
    wan_config: boolean;

    snmp_index: string;
    pon_index: string;
    software_version: string;
    hardware_version: string;
    firmware_version: string;
    onu_type: number;
    onu_serial: string;
    rx: string;
    tx: string;

    onu_pon_type: number;
    onu_pon_enable_status: number;
    onu_pon_speed: number;
    onu_pon_optical_vltage: number;
    onu_pon_optical_current: number;
    onu_pon_optical_temperature: number;
    onu_pon_is_optical_power_valid: number;
    onu_pon_upstream_speed: number;

    onu_status: number;
    auth_onu_cpu_usage: number;
    auth_onu_memory_usage: number;
    auth_onu_mac_number_limit: number;
    auth_onu_mac_number_limit_apply: number;
    auth_onu_last_up: string;
    auth_onu_last_down: string;
    auth_onu_list_onu_type_description: string;

    port_speed: string;
    port_name: string;
    port_mode: string;
    port_vlan: string;
    port_mac: string;

    pots_enable: boolean;
    tel_num: string;
    binding_signal_name: string;
    signal_vlan: string;
    protocol_port: number;
    username_sip_tel_num: string;
    sip_username: string;

    wan_index: string;
    wan_conn_type: string;
    wan_vlan_id: string;
    wan_nat_enable: string;
    wan_dsp: string;
    wan_pppoe_username: string;
    wan_pppoe_password: string;
    wan_vlan_mode: string;

    datetime: Date;
}
export interface CpeRecordModel extends Model<CpeRecordAttributes>, CpeRecordAttributes { }

export type CpeRecordStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): CpeRecordModel;
};

export function CpeRecordFactory(sequelize: Sequelize): CpeRecordStatic {
    return <CpeRecordStatic>sequelize.define("cpe_record", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        erp_cpe_id: { type: DataTypes.INTEGER, },
        erp_ap_id: { type: DataTypes.INTEGER, },
        online: { type: DataTypes.BOOLEAN, },
        wan_config: { type: DataTypes.BOOLEAN, },

        snmp_index: { type: DataTypes.STRING, },
        pon_index: { type: DataTypes.STRING, },
        software_version: { type: DataTypes.STRING, },
        hardware_version: { type: DataTypes.STRING, },
        firmware_version: { type: DataTypes.STRING, },
        onu_type: { type: DataTypes.INTEGER, },
        onu_serial: { type: DataTypes.STRING, },
        rx: { type: DataTypes.STRING, },
        tx: { type: DataTypes.STRING, },

        onu_pon_type: { type: DataTypes.INTEGER, },
        onu_pon_enable_status: { type: DataTypes.INTEGER, },
        onu_pon_speed: { type: DataTypes.INTEGER, },
        onu_pon_optical_vltage: { type: DataTypes.INTEGER, },
        onu_pon_optical_current: { type: DataTypes.INTEGER, },
        onu_pon_optical_temperature: { type: DataTypes.INTEGER, },
        onu_pon_is_optical_power_valid: { type: DataTypes.INTEGER, },
        onu_pon_upstream_speed: { type: DataTypes.INTEGER, },

        onu_status: { type: DataTypes.INTEGER, },
        auth_onu_cpu_usage: { type: DataTypes.INTEGER, },
        auth_onu_memory_usage: { type: DataTypes.INTEGER, },
        auth_onu_mac_number_limit: { type: DataTypes.INTEGER, },
        auth_onu_mac_number_limit_apply: { type: DataTypes.INTEGER, },
        auth_onu_last_up: { type: DataTypes.STRING, },
        auth_onu_last_down: { type: DataTypes.STRING, },
        auth_onu_list_onu_type_description: { type: DataTypes.STRING, },

        port_speed: { type: DataTypes.STRING, },
        port_name: { type: DataTypes.STRING, },
        port_mode: { type: DataTypes.STRING, },
        port_vlan: { type: DataTypes.STRING, },
        port_mac: { type: DataTypes.STRING, },

        pots_enable: { type: DataTypes.BOOLEAN, },
        tel_num: { type: DataTypes.STRING, },
        binding_signal_name: { type: DataTypes.STRING, },
        signal_vlan: { type: DataTypes.STRING, },
        protocol_port: { type: DataTypes.INTEGER, },
        username_sip_tel_num: { type: DataTypes.STRING, },
        sip_username: { type: DataTypes.STRING, },

        wan_index: { type: DataTypes.STRING, },
        wan_conn_type: { type: DataTypes.STRING, },
        wan_vlan_id: { type: DataTypes.STRING, },
        wan_nat_enable: { type: DataTypes.STRING, },
        wan_dsp: { type: DataTypes.STRING, },
        wan_pppoe_username: { type: DataTypes.STRING, },
        wan_pppoe_password: { type: DataTypes.STRING, },
        wan_vlan_mode: { type: DataTypes.STRING, },

        datetime: { type: DataTypes.DATE, },

    }, { tableName: "cpe_record", timestamps: false });
}
