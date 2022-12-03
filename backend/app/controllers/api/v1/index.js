('use strict');
const { asyncMiddleware } = global;
const { Roles } = global.appEnums;
const { getHashedPassword } = global.commonFunctions;
const {
    Users,
} = global.db;
const SendMAil = require(`${global.paths.lib}/email-sender`);
const { decodeAPiToken } = global.commonFunctions;
const {
    newAndConfirmPasswordValidator,
} = require(`${global.paths.middlewares}/password`);

module.exports = (router) => {
    router.post(
        '/login',
        asyncMiddleware(async (req, res) => {
            const { email, password } = req.body;
            const user = await Users.$$findOne({
                query: { where: { email, password: getHashedPassword(password) } },
                error: 'Invalid email or password!',
            });

            res.http200({
                token: user.createToken(),
                user,
            });
        })
    );

    router.post(
        '/signup',
        asyncMiddleware(async (req, res) => {
            const user = await Users.create({ ...req.body, role: Roles.customer });
            res.http200({ token: user.createToken(), user });
        })
    );

    router.get(
        '/me',
        asyncMiddleware(async (req, res) => {
            res.http200({
                user: req.user,
            });
        })
    );

    router.post(
        '/verify-token',
        asyncMiddleware(async (req, res) => {
            const { token } = req.body;
            const user = await getUserFromToken(token);
            if (token == user.token) {
                return res.http200('Token verified');
            }
            return res.http500('Token unverified');
        })
    );

    router.put(
        '/reset-password',
        [newAndConfirmPasswordValidator],
        asyncMiddleware(async (req, res) => {
            const { token, confirmPassword } = req.body;
            const user = await getUserFromToken(token);

            const updatedUser = await user.update({
                password: confirmPassword,
                token: '',
            });
            return res.http200(updatedUser);
        })
    );

};


async function getUserFromToken(token) {
    const decodedToken = await decodeAPiToken(token);
    const user = await Users.$$findOne({
        query: {
            where: {
                email: decodedToken.email,
            },
        },
    });
    return user;
}
