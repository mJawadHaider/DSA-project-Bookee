("use strict");
const { asyncMiddleware } = global;
const { ROLES, STATUS } = global.appEnums;
const { getHashedPassword } = global.commonFunctions;
const { Users, UserBooks } = global.db;
const SendMAil = require(`${global.paths.lib}/email-sender`);
const { sequelizeConfig } = require(`${global.paths.lib}/sequelize`);
const { decodeAPiToken } = global.commonFunctions;
const {
  newAndConfirmPasswordValidator,
} = require(`${global.paths.middlewares}/password`);

module.exports = (router) => {
  router.post(
    "/login",
    asyncMiddleware(async (req, res) => {
      const { email, password } = req.body;
      const user = await Users.$$findOne({
        query: { where: { email, password: getHashedPassword(password) } },
        error: "Invalid email or password!",
      });

      res.http200({
        token: user.createToken(),
        user,
      });
    })
  );

  router.post(
    "/signup",
    asyncMiddleware(async (req, res) => {
      const user = await Users.create({ ...req.body, role: ROLES.reader });
      res.http200({ token: user.createToken(), user });
    })
  );

  router.get(
    "/me",
    asyncMiddleware(async (req, res) => {
      res.http200({
        user: req.user,
      });
    })
  );

  router.post(
    "/verify-token",
    asyncMiddleware(async (req, res) => {
      const { token } = req.body;
      const user = await getUserFromToken(token);
      if (token == user.token) {
        return res.http200("Token verified");
      }
      return res.http500("Token unverified");
    })
  );

  router.put(
    "/reset-password",
    [newAndConfirmPasswordValidator],
    asyncMiddleware(async (req, res) => {
      const { token, confirmPassword } = req.body;
      const user = await getUserFromToken(token);

      const updatedUser = await user.update({
        password: confirmPassword,
        token: "",
      });
      return res.http200(updatedUser);
    })
  );

  router.post(
    '/user-books',
    asyncMiddleware(async (req, res) => {
      const {userId, bookId, isReading, isComplete, inQueue} = req.body;
      let status = "";
      if (isReading) {
        status = STATUS.Book.reading;
      } else if (isComplete) {
        status = STATUS.Book.complete;
      } else {
        status = STATUS.Book.inQueue
      }
      const userBook = await UserBooks.create({
        userId,
        bookId,
        status
      });
      res.http200(userBook);
    })
  );

  // router
  //   .route("/user-book/:bookId")
  //   .get(
  //     asyncMiddleware(async (req, res) => {
  //       console.log("req.parmas.bookId: ",req.params.bookId);
  //       const query = {
  //         where: {
  //           id: req.params.bookId
  //         },
  //         order: sequelizeConfig.Order.Desc(),
  //       }
  //       const userBook = await UserBooks.findOne(query);
  //       console.log("userBook: ", userBook);
  //       res.http200(req.userBook);
  //     })
  //   )
  //   .put(
  //     asyncMiddleware(async (req, res) => {
  //       console.log('req.body: ', req.body);
  //       const {name, author, description, genre} = req.body;
  //       const bookId = req.params.bookId;
  //       const previousBook = await Books.findOne({
  //           where: { id: bookId },
  //       });
  //       console.log('req.book: ', req.books);
  //       const updatedbook = await req.books.update({
  //         name,
  //         author,
  //         description,
  //         genre
  //       });
  //       return res.http200(updatedbook);
  //     })
  //   )
  //   .delete(
  //     asyncMiddleware(async (req, res) => {
  //       await Books.destroy({ where: { id: req.params.bookId } });
  //       return res.http200("Deleted book successfully!");
  //     })
  //   );
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
