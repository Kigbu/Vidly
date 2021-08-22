const config = require('config');

module.exports = function () {
    // $env:kigbuvidly_jwtPrivateKey = "mySecureKey"
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
}
}