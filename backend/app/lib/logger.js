const bunyan = require('bunyan');

module.exports = bunyan.createLogger({
    'name': 'nrts',
    'level': 10,
});
