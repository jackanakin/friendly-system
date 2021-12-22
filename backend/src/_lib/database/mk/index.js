import Sequelize from 'sequelize';
import databaseConfig from '../../../_config/database/mk';

class MKDatabase {
  async rawQuery(query) {
    const sequelize = new Sequelize(databaseConfig);

    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    await sequelize.close();

    return result;
  }
}

export default new MKDatabase();