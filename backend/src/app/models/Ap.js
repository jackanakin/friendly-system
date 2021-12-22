import Sequelize, { Model } from 'sequelize';

class Ap extends Model {
    static init(sequelize) {
        super.init(
            {
                erp_id: Sequelize.INTEGER,
                description: Sequelize.STRING,
                oid_identification: Sequelize.STRING,
                oid_identification_reduced: Sequelize.STRING,
                address: Sequelize.STRING,
                snmp_port: Sequelize.INTEGER,
                snmp_community: Sequelize.STRING,
                voice_vlan: Sequelize.STRING,
                data_vlan: Sequelize.STRING,
                enabled: Sequelize.BOOLEAN,
            },
            { tableName: 'ap', sequelize, timestamps: false }
        );

        return this;
    }
}

export default Ap;