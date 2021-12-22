import Sequelize, { Model } from 'sequelize';

class ApAvailableOid extends Model {
    static init(sequelize) {
        super.init(
            {
                description: Sequelize.STRING,
                oid: Sequelize.STRING,
                oid_reduced: Sequelize.STRING,
                ap: Sequelize.STRING,

            },
            { tableName: 'ap_available_oid', sequelize, timestamps: false }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Ap, { foreignKey: 'ap_id', as: 'ap' });
    }
}

export default ApAvailableOid;