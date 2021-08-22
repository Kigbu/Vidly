const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    winston.exceptions.handle(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

    // handling unhandled Promise Rejections
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    // File transport
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    // DB transport
    // winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly', level: 'info' }));
}