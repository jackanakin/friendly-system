import Sequelize, { Model } from 'sequelize';

class CpeRecord extends Model {
    static init(sequelize) {
        super.init(
            {
                erp_cpe_id: Sequelize.INTEGER,
                erp_ap_id: Sequelize.INTEGER,
                online: Sequelize.BOOLEAN,
                wan_config: Sequelize.BOOLEAN,

                snmp_index: Sequelize.STRING,
                pon_index: Sequelize.STRING,
                software_version: Sequelize.STRING,
                hardware_version: Sequelize.STRING,
                firmware_version: Sequelize.STRING,
                onu_type: Sequelize.INTEGER,
                onu_serial: Sequelize.STRING,
                rx: Sequelize.STRING,
                tx: Sequelize.STRING,

                onu_pon_type: Sequelize.INTEGER,
                onu_pon_enable_status: Sequelize.INTEGER,
                onu_pon_speed: Sequelize.INTEGER,
                onu_pon_optical_vltage: Sequelize.INTEGER,
                onu_pon_optical_current: Sequelize.INTEGER,
                onu_pon_optical_temperature: Sequelize.INTEGER,
                onu_pon_is_optical_power_valid: Sequelize.INTEGER,
                onu_pon_upstream_speed: Sequelize.INTEGER,
            
                onu_status: Sequelize.INTEGER,
                auth_onu_cpu_usage: Sequelize.INTEGER,
                auth_onu_memory_usage: Sequelize.INTEGER,
                auth_onu_mac_number_limit: Sequelize.INTEGER,
                auth_onu_mac_number_limit_apply: Sequelize.INTEGER,
                auth_onu_last_up: Sequelize.STRING,
                auth_onu_last_down: Sequelize.STRING,
                auth_onu_list_onu_type_description: Sequelize.STRING,
            
                port_speed: Sequelize.STRING,
                port_name: Sequelize.STRING,
                port_mode: Sequelize.STRING,
                port_vlan: Sequelize.STRING,
                port_mac: Sequelize.STRING,
            
                pots_enable: Sequelize.BOOLEAN,
                tel_num: Sequelize.STRING,
                binding_signal_name: Sequelize.STRING,
                signal_vlan: Sequelize.STRING,
                protocol_port: Sequelize.INTEGER,
                username_sip_tel_num: Sequelize.STRING,
                sip_username: Sequelize.STRING,
            
                wan_index: Sequelize.STRING,
                wan_conn_type: Sequelize.STRING,
                wan_vlan_id: Sequelize.STRING,
                wan_nat_enable: Sequelize.STRING,
                wan_dsp: Sequelize.STRING,
                wan_pppoe_username: Sequelize.STRING,
                wan_pppoe_password: Sequelize.STRING,
                wan_vlan_mode: Sequelize.STRING,

                datetime: Sequelize.DATE
            },
            { tableName: 'cpe_record', sequelize, timestamps: false }
        );
        return this;
    }

    static associate(models) {
        //this.belongsTo(models.Cpe, { foreignKey: 'cpe_id', as: 'cpe' });
    }
}

export default CpeRecord;