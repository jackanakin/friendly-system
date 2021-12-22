import Sequelize, { Model } from 'sequelize';

class PhoneSubscriber extends Model {
    static init(sequelize) {
        super.init(
            {
                erp_contract_id: Sequelize.NUMBER,
                name: Sequelize.STRING,
                phone_number: Sequelize.STRING,
                plan_name: Sequelize.STRING,
                product_name: Sequelize.STRING,
                summit_license: Sequelize.STRING,
                summit_category: Sequelize.STRING,
                summit_partition: Sequelize.STRING,
                city: Sequelize.STRING
            },
            { sequelize, tableName: 'phone_subscriber', timestamps: false }
        );

        return this;
    }
}

export default PhoneSubscriber;
