'use strict';

// Define Global Keys
require('dotenv').config();
require('./global-keys');

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const kraken = require('kraken-js');
const compression = require('compression');
const cors = require('cors');
const path = require('path');


const customResponseMethodAppender = require('customize-response-appender')({
    reponsesConfigFilePath: '/app/config/responses-config.js',
});
const app = express();

/*
 * Kraken-js Configurations
 */
const options = {
    onconfig: function (config, next) {
        next(null, config);
    }
};
app.use(kraken(options));
app.set('view engine','ejs');

// <<<<<---------------MIDDLEWARES------------------------>>>>>
// For custom configuration you just have to pass false as a prameter and update config file accordingly

// parse application/json
app.use(bodyParser.json());
app.use(compression());
app.use(express.static(path.resolve(path.join(__dirname, '/views'))));
app.use(express.static(path.resolve(path.join(__dirname, '../dist'))));

app.use(cors(require(`${global.paths.config}/cors-options`)()));

app.all('*', customResponseMethodAppender);



app.on('start', function () {
    global.log.info('Application ready to serve requests.');
    global.log.info('Environment: %s', app.kraken.get('env:env'));
});

module.exports = app;
