require('dotenv/config');

module.exports = {
    dialect: 'postgres',
    host: process.env.MKDB_HOST,
    username: process.env.MKDB_USER,
    password: process.env.MKDB_PASS,
    database: process.env.MKDB_NAME,
    logging: false,
    define: {
        timestamp: true,
        underscored: true,
        underscoredAll: true,
    },
};