require('dotenv/config');

export default {
    dialect: 'postgres',
    host: process.env.MAINDB_HOST,
    port: process.env.MAINDB_PORT,
    username: process.env.MAINDB_USER,
    password: process.env.MAINDB_PASS,
    database: process.env.MAINDB_NAME,
    logging: false,
    define: {
        timestamp: true,
        underscored: true,
        underscoredAll: true,
    },
} as any;