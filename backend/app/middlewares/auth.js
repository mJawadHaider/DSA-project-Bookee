const { decodeAPiToken } = global.commonFunctions;
const { log } = global;
const { Users } = global.db;

module.exports = function () {
    return async (req, res, next) => {
        try {

            if (req.authNotRequired) {
                return next();
            }

            const { authorization } = req.headers;
            if (!authorization) throw 'Authorization header missing!';

            const token = authorization.split(' ')[1];
            const decodedToken = await decodeAPiToken(token);

            if (!decodedToken) throw 'Invalid token!';

            const user = await Users.$$findOne({
                query: {
                    where: {
                        id: decodedToken.id,
                        email: decodedToken.email,
                    }
                },
                error: 'Invalid token!',
            });

            req.user = user;
            next();
        } catch (err) {
            log.error(err);
            return res.http401(err);
        }
    };
};
