import Sequelize from 'sequelize';
import databaseConfig from '../../../_config/database/main';

import IntegrationSettings from '../../../app/models/IntegrationSettings'
import Ap from '../../../app/models/Ap'
import Cpe from '../../../app/models/Cpe'
import CpeRecord from '../../../app/models/CpeRecord'
import User from '../../../app/models/User'
import PhoneSubscriber from '../../../app/models/PhoneSubscriber'
import PhonePrefixCity from '../../../app/models/PhonePrefixCity'

const models = [IntegrationSettings, Ap, Cpe, CpeRecord, User, PhoneSubscriber, PhonePrefixCity];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
