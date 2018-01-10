'use strict';

const mongoose = require('mongoose');
const config = require('config-lite')(__dirname);
const winston = require('winston');

const myCustomLevels = {
    levels: {
        success: 0,
        info: 1,
        warning: 2,
        error: 3
    },
    colors: {
        success: 'green',
        info: 'black',
        warning: 'yellow',
        error: 'red'

    }
}
const closeDbDebug = false;
const ignoreDbDebug = winston.format((info, opts) => {
    if (info.closeDbDebug) { return false; }
    return info;
});

winston.addColors(myCustomLevels);
const dblogger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './logs/dblog.log' })
    ],
    format: winston.format.combine(
        ignoreDbDebug(),
        winston.format.colorize({ all: true }),
        winston.format.simple()
    )
});



mongoose.connect(config.url, { useMongoClient: true });
//mongoose.Promise = global.npm;

const db = mongoose.connection;

db.once('open', () => {
    dblogger.log({
        level: 'info',
        message: 'connect the mongodb successfully',
        closeDbDebug: closeDbDebug
    });
});

db.on('error', function(error) {
    dblogger.log({
        level: 'error',
        message: 'Error in MongoDb connection:',
        closeDbDebug: closeDbDebug
    });
    mongoose.disconnect();
});

db.on('close', function() {
    dblogger.log({
        level: 'warn',
        message: 'disconnect the db, reconnect',
        closeDbDebug: closeDbDebug
    });
    mongoose.connect(config.url, { server: { auto_reconnect: true } });
});

module.exports = db;