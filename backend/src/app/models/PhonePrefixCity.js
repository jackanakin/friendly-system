import Sequelize, { Model } from 'sequelize';

class PhonePrefixCity extends Model {
    static init(sequelize) {
        super.init(
            {
                prefix: Sequelize.STRING,
                city: Sequelize.STRING
            },
            { sequelize, tableName: 'phone_prefix_city', timestamps: false }
        );

        return this;
    }
}

export default PhonePrefixCity;
