const crypto = require('crypto');
const promise = require('bluebird');
const jwt = require('jsonwebtoken');
const jwtVerify = promise.promisify(require('jsonwebtoken').verify);

module.exports.getHashedPassword = (password) =>
    crypto.createHash('sha256').update(password).digest('base64');

module.exports.generateRandomPassword = function ({ length = 10 } = {}) {
    return Math.random().toString(36).slice(length);
};

module.exports.convertIfBoolean = function (value) {
    let newValue = value;
    if (value === 'true') {
        newValue = true;
    } else if (value === 'false') {
        newValue = false;
    }
    return newValue;
};


module.exports.decodeAPiToken = (token) =>
    jwtVerify(token, process.env.jwtSecret);

module.exports.createToken = function (object, expiresIn) {
    let options = {};
    if (expiresIn) {
        options.expiresIn = expiresIn;
    }
    return jwt.sign(object, process.env.jwtSecret, options);
};
