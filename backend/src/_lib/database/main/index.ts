import * as sequelize from "sequelize";
import bcrypt from 'bcryptjs';

import databaseConfig from '../../../_config/database/main';

import { ApFactory } from "../../../app/models/Ap";
import { CpeFactory } from "../../../app/models/Cpe";
import { CpeRecordFactory } from "../../../app/models/CpeRecord";
import { UserFactory, UserModel } from "../../../app/models/User";

export const dbConfig = new sequelize.Sequelize(
    databaseConfig
);

// SOMETHING VERY IMPORTANT them Factory functions expect a
// sequelize instance as parameter give them `dbConfig`

export const Ap = ApFactory(dbConfig);
export const Cpe = CpeFactory(dbConfig);
export const CpeRecord = CpeRecordFactory(dbConfig);
export const User = UserFactory(dbConfig);

// Users have skills then lets create that relationship
User.addHook('beforeSave', async (user: UserModel) => {
    if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
    }
});
//User.hasMay(Skills);

// or instead of that, maybe many users have many skills
//Skills.belongsToMany(Users, { through: "users_have_skills" });

