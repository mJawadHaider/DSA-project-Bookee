const { asyncMiddleware } = global;
const { Users } = global.db;
const { UserAttachments } = global.db;
const regex = global.appConstants.regex;

const SendMAil = require(`${global.paths.lib}/email-sender`);
const {
    oldPasswordValidator,
    passwordChangeValidator,
    newAndConfirmPasswordValidator,
} = require(`${global.paths.middlewares}/password`);

module.exports = (router) => {  
    router.param(
        'userId',
        asyncMiddleware(async (req, res, next, userId) => {
            const user = await Users.$$findByPk({ id: +userId });
            req.extractedUser = user;
            next();
        })
    );

    router
        .route(`/:userId${regex.alphanumericWithAtLeastOneNumber}`)
        .get(
            asyncMiddleware(async (req, res) => {
                if (req.user.isAdmin) {
                    return res.http200(req.extractedUser);
                }

                if (req.user.id !== req.extractedUser.id) {
                    throw 'You don\'t have access to view this profile!';
                }
                return res.http200(req.extractedUser);
            })
        )
        .put(
            asyncMiddleware(async (req, res) => {
                delete req.body.id;
                const updatedUser = await req.extractedUser.update(req.body);
                return res.http200(updatedUser);
            })
        );

    router.route('/:userId/change-password').put(
        [
            oldPasswordValidator,
            passwordChangeValidator,
            newAndConfirmPasswordValidator,
        ],
        asyncMiddleware(async (req, res) => {
            const user = await Users.$$findByPk({ id: +req.params.userId });
            const updatedUser = await user.update({ password: req.body.newPassword });
            return res.http200(updatedUser);
        })
    );

    router.post(
        '/change-email',
        asyncMiddleware(async (req, res) => {
            const { email } = req.body;
            const findUserAgainstEmail = await Users.$$findOne({
                query: {
                    where: {
                        email,
                    },
                },
                throwError: false,
            });

            if (findUserAgainstEmail) {
                return res.http500('Email already exist!');
            }

            const user = req.user;
            const token = user.createToken();
            await user.update({ token: token, tempEmail: email });

            SendMAil('change-email', {
                to: email,
                subject: 'Want to change email? Let\'s register new one.',
                variables: {
                    userName: user.fullName,
                    url: `${process.env.FE_URL}/verify-email?token=${token}`,
                },
            });

            res.http200('Mail sent successfully!');
        })
    );

    router.get(
        '/:userId/user-attachments',
        asyncMiddleware(async (req, res) => {
            const userId = req.params.userId;
            const attachments = await UserAttachments.findAndCountAll({
                where: {
                    userId,
                },
            });
            res.http200(attachments.rows, { count: attachments.count });
        })
    );
};
