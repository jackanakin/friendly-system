import * as sequelize from "sequelize";
import bcrypt from 'bcryptjs';

import databaseConfig from '../../../_config/database/main';

import { ApFactory } from "../../../app/models/Ap";
import { CpeFactory } from "../../../app/models/Cpe";
import { CpeRecordFactory } from "../../../app/models/CpeRecord";
import { PhoneSubscriberFactory } from "../../../app/models/PhoneSubscriber";
import { PhonePrefixCityFactory } from "../../../app/models/PhonePrefixCity";
import { UserFactory, UserModel } from "../../../app/models/User";
import { GponCountFactory } from "../../../app/models/gpon/GponCount";
import { GponIntegrationFactory } from "../../../app/models/GponIntegration";
import { GponTxAverageFactory } from "../../../app/models/gpon/GponTxAverage";
import { GponRxAverageFactory } from "../../../app/models/gpon/GponRxAverage";
import { CtoCountFactory } from "../../../app/models/gpon/CtoCount";
import { CtoRxAverageFactory } from "../../../app/models/gpon/CtoRxAverage";
import { CtoTxAverageFactory } from "../../../app/models/gpon/CtoTxAverage";

export const database = new sequelize.Sequelize(
    databaseConfig
);

// SOMETHING VERY IMPORTANT them Factory functions expect a
// sequelize instance as parameter give them `dbConfig`

export const Ap = ApFactory(database);
export const Cpe = CpeFactory(database);
export const CpeRecord = CpeRecordFactory(database);
export const User = UserFactory(database);
export const PhoneSubscriber = PhoneSubscriberFactory(database);
export const PhonePrefixCity = PhonePrefixCityFactory(database);
export const GponIntegration = GponIntegrationFactory(database);

//Gpon
export const GponCount = GponCountFactory(database);
export const GponTxAverage = GponTxAverageFactory(database);
export const GponRxAverage = GponRxAverageFactory(database);
export const CtoCount = CtoCountFactory(database);
export const CtoRxAverage = CtoRxAverageFactory(database);
export const CtoTxAverage = CtoTxAverageFactory(database);

// Users have skills then lets create that relationship
User.addHook('beforeCreate', 'password_hash', async (user: UserModel) => {
    if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
    }
});

//User.hasMay(Skills);
GponCount.belongsTo(GponIntegration, {
    as: "GponIntegration"
});

// or instead of that, maybe many users have many skills
//Skills.belongsToMany(Users, { through: "users_have_skills" });

