'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mk_ap', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      erp_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      technology: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      os: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      oid_identification: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      oid_identification_reduced: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      snmp_port: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      snmp_community: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      is_integrated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('mk_ap');
  }
};
