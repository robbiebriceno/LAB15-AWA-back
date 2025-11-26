const { Sequelize } = require('sequelize');
require('dotenv').config();

const connectionUrl = process.env.MYSQL_URL || process.env.MYSQL_PUBLIC_URL || process.env.DATABASE_URL || process.env.DB_URL;

try {
    const present = {
        MYSQL_URL: !!process.env.MYSQL_URL,
        MYSQL_PUBLIC_URL: !!process.env.MYSQL_PUBLIC_URL,
        DATABASE_URL: !!process.env.DATABASE_URL,
        DB_URL: !!process.env.DB_URL,
        DB_HOST: !!process.env.DB_HOST,
        DB_PORT: !!process.env.DB_PORT
    };
    console.log('DB env presence:', present);
    if (connectionUrl) {
        try {
            const url = new URL(connectionUrl);
            console.log(`Using DB URL from env: ${url.protocol}//${url.hostname}:${url.port}${url.pathname}`);
        } catch (e) {
            console.log('Using DB connectionUrl (unable to parse)');
        }
    } else {
        console.log(`Using DB parts: host=${process.env.DB_HOST}, port=${process.env.DB_PORT}, name=${process.env.DB_NAME}`);
    }
} catch (e) {
    console.log('Error logging DB envs', e);
}

const commonOptions = {
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

let sequelize;
if (connectionUrl) {
    sequelize = new Sequelize(connectionUrl, commonOptions);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        Object.assign({}, commonOptions, {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined
        })
    );
}

module.exports = sequelize;