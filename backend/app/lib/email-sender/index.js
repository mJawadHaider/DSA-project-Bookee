const path = require('path');
const templateMaker = require('./template-maker');
const sendEmail = require('./mailer');


module.exports = async function (templateName, mailOptions) {
    try {
        const html = await templateMaker(path.resolve(path.join(__dirname, `../../views/${templateName}.ejs`)), mailOptions.variables || {});
        delete mailOptions.variables;
        await sendEmail({ ...mailOptions, from: process.env.EMAIL, html });
        console.info('Mail sent successfully!');
    } catch (e) {
        console.error(e);
    }
};
