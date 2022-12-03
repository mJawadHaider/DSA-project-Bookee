'use strict';

const routes = require('./config.json');

module.exports = () => (req, res, next) => {
    req.authNotRequired = false;

    let url = getOriginalUrl(req.originalUrl);


    if (!url.includes('v1') || routes.some(route => checkUrlMatchOrNot(`/v1${route}`, url))) {
        req.authNotRequired = true;
    }

    next();
};

/** 
 * Parse Request url and remove api,vrooapi and query string from it
 */
function getOriginalUrl(requestUrl) {
    requestUrl = requestUrl.split('/api');
    requestUrl = requestUrl[1] || requestUrl[0];
    requestUrl = requestUrl.split('?')[0];
    requestUrl = requestUrl.split('/');
    return requestUrl;
}

/** 
 * Check that url is with route or not
 */
function checkUrlMatchOrNot(uri, requestUrl) {
    let splittedUri = uri.split('/');
    let urlMatched = false;

    if (requestUrl.length === splittedUri.length) {
        return splittedUri.every((item, index) => !~item.indexOf(':') ? item === requestUrl[index] : true);
    }
    return urlMatched;
}
