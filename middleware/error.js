const winston = require('winston');

module.exports = function(err, req, res, next) {
    // Log the exception
    // Logging Levels => error, warn, info, erbose, debug, silly
    // winston.log('error', err.message); // OR
    winston.error(err.message, err);
    res.status(500).send('Something failed');
}