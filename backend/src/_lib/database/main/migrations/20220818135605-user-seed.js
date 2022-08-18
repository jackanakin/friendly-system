'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `
        --user sysadmin with fun123 password
        INSERT INTO users VALUES (default, 'sysadmin', 'sysadmin', '$2a$08$5uBxJEo.56D59Vf2yGRsJuux4hVtAXSfMfbYmN7m8BpdSXNyIAdQa', true, now(), now());
      `
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `
        DELETE FROM users;
      `
    );
  }
};
