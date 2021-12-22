import Sequelize, { Model } from 'sequelize';

class IntegrationSettings extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                value: Sequelize.STRING,
            },
            { sequelize }
        );

        return this;
    }
}

export default IntegrationSettings;