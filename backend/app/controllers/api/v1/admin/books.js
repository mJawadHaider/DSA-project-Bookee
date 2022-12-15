const { asyncMiddleware } = global;
const { sequelizeConfig } = require(`${global.paths.lib}/sequelize`);
const { Books, Sequelize } = global.db;

module.exports = (router) => {
  router
    .route("/")
    .get(
      asyncMiddleware(async (req, res) => {
        const query = {
          where: {},
          order: sequelizeConfig.Order.Desc(),
        };
        const books = await Books.findAndCountAll(query);
        return res.http200(books.rows, { count: books.count });
      })
    )
    .post(
      asyncMiddleware(async (req, res) => {
        delete req.body.id;
        const record = await Books.findOne({
          where: {
            name: req.body.name,
            author: req.body.author,
            description: req.body.description,
            genre: req.body.genre,
          }
        });
        if(record) {
          return res.http200("Enter Unique Book");
        }
        const books = await Books.create(req.body);
        return res.http200(books);
      })
    );

  router.param(
    "bookId",
    asyncMiddleware(async (req, res, next, bookId) => {
      const book = await Books.$$findByPk({
        id: +bookId,
      });
      req.book = book;
      next();
    })
  );

  router
    .route("/:bookId")
    .get(
      asyncMiddleware(async (req, res) => {
        res.http200(req.book);
      })
    )
    .put(
      asyncMiddleware(async (req, res) => {
        const {name, author, description, genre} = req.body;
        const updatedbook = await req.book.update({
          name,
          author,
          description,
          genre
        });
        return res.http200(updatedbook);
      })
    )
    .delete(
      asyncMiddleware(async (req, res) => {
        await Books.destroy({ where: { id: req.params.bookId } });
        return res.http200("Deleted book successfully!");
      })
    );
};
