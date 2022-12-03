const { Dates } = global.db;
module.exports = () =>
    async function getDate(req, res, next) {
        const { date } = req.body;
        const dateObject = await Dates.findCreate(date);
        req.date = dateObject;
        next();
    };
