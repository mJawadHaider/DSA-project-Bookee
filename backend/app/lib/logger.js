const bunyan = require('bunyan');

module.exports = bunyan.createLogger({
    'name': 'bookee',
    'level': 10,
});
