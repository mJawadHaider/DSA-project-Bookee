const { getHashedPassword } = global.commonFunctions;

module.exports.oldPasswordValidator = function (req, res, next) {
    const { oldPassword } = req.body;
    if(req.user.isAdmin) {
        return next();
    }
    
    return getHashedPassword(oldPassword) !== req.user.password
        ? res.http500('Incorrect old Password!')
        : next();
};

module.exports.passwordChangeValidator = function (req, res, next) {
    const { newPassword } = req.body;
    return (getHashedPassword(newPassword) === req.user.password)
        ? res.http500('New password and old password are same!')
        : next();
};

module.exports.newAndConfirmPasswordValidator = function (req, res, next) {
    const { newPassword, confirmPassword } = req.body;
    return (newPassword !== confirmPassword)
        ? res.http500('New password and confirm password do not match!')
        : next();
};
