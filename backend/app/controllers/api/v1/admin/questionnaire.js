const { asyncMiddleware } = global;
const { sequelizeConfig } = require(`${global.paths.lib}/sequelize`);
const { Questionnaire, Sequelize } = global.db;

module.exports = (router) => {
    router
        .route('/')
        .get(
            asyncMiddleware(async (req, res) => {
                const query = {
                    where: {},
                    order: sequelizeConfig.Order.Desc(),
                };
                if (req.query.toDate) {
                    // query.where.createdAt = {
                    //     [Sequelize.Op.between]: [req.query.fromDate, req.query.toDate],
                    // };
                }

                if (req.query.search) {
                    // const likeObject = {
                    //     [Sequelize.Op.like]: `${req.query.search}%`,
                    // };
                    // query.where[Sequelize.Op.or] = [
                    //     {
                    //         name: likeObject,
                    //     },
                    // ];
                }

                const questionnaire = await Questionnaire.findAndCountAll(query);
                return res.http200(questionnaire.rows, { count: questionnaire.count });
            })
        )
        .post(
            asyncMiddleware(async (req, res) => {
                delete req.body.id;
                const questionnaire = await Questionnaire.create(req.body);
                return res.http200(questionnaire);
            })
        );

    router.param(
        'questionnaireId',
        asyncMiddleware(async (req, res, next, questionnaireId) => {
            const questionnaire = await Questionnaire.$$findByPk({ id: +questionnaireId });
            req.questionnaire = questionnaire;
            next();
        })
    );

    router
        .route('/:questionnaireId')
        .get(
            asyncMiddleware(async (req, res) => {
                res.http200(req.questionnaire);
            })
        )
        .put(
            asyncMiddleware(async (req, res) => {
                delete req.body.id;
                const updatedquestionnaire = await Questionnaire.update(req.body);
                return res.http200(updatedquestionnaire);
            })
        )
        .delete(
            asyncMiddleware(async (req, res) => {
                await Questionnaire.destroy({ where: { id: req.params.id } });
                return res.http200('Deleted questionnaire successfully!');
            })
        );
};
