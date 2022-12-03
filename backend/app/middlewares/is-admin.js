module.exports = function () {
    return function (req, res, next) {
        if (req.authNotRequired) {
            return next();
        } else if (req.originalUrl.includes('/admin') && !req.user.isAdmin) {
            return res.http401('You don\'t have access to this route!');
        }

        next();
    };
};
