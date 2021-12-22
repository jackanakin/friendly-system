import Sequelize, { Model } from 'sequelize';

class Cpe extends Model {
    static init(sequelize) {
        super.init(
            {
                erp_cpe_id: Sequelize.INTEGER,
                erp_ap_id: Sequelize.INTEGER,
                erp_contract_id: Sequelize.INTEGER,

                name: Sequelize.STRING,
                username: Sequelize.STRING,
                device_password: Sequelize.STRING,
                mac_address: Sequelize.STRING,
                onu_serial: Sequelize.STRING,
                nap: Sequelize.STRING,
                nap_port: Sequelize.INTEGER,
                technology: Sequelize.STRING,
                cadastrado: Sequelize.STRING,
                observation: Sequelize.STRING,
                address_list: Sequelize.STRING,

                online: Sequelize.BOOLEAN,
                integration_updated: Sequelize.BOOLEAN,
                olt_matched: Sequelize.BOOLEAN,

                last_firmware_version: Sequelize.STRING,
                last_hardware_version: Sequelize.STRING,
                last_online: Sequelize.BOOLEAN,
                last_onu_serial: Sequelize.STRING,
                last_onu_type: Sequelize.INTEGER,
                last_pon_index: Sequelize.STRING,
                last_rx: Sequelize.INTEGER,
                last_snmp_index: Sequelize.INTEGER,
                last_tx: Sequelize.INTEGER,
                last_software_version: Sequelize.STRING
            },
            { tableName: 'cpe', sequelize, timestamps: false }
        );
        return this;
    }
}

export default Cpe;