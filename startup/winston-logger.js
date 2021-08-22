const winston = require('winston');
require('winston-mongodb');


const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});
module.exports.logger = logger;