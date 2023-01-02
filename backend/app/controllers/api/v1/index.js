("use strict");
const { asyncMiddleware } = global;
const { ROLES, STATUS } = global.appEnums;
const { getHashedPassword } = global.commonFunctions;
const { Users, UserBooks, Books } = global.db;
const SendMAil = require(`${global.paths.lib}/email-sender`);
const { sequelizeConfig } = require(`${global.paths.lib}/sequelize`);
const { decodeAPiToken } = global.commonFunctions;
const { Op, Sequelize } = require("sequelize");
const user = require("./user");
const {
  newAndConfirmPasswordValidator,
} = require(`${global.paths.middlewares}/password`);
const BookData = require("../../../BookData.json");
const { upperCase } = require("lodash");

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

  router.get(
    "/all-users",
    asyncMiddleware(async (req, res) => {
      const query = {
        where: {},
        order: sequelizeConfig.Order.Desc(),
        attributes: [
          "id",
          "firstName",
          "lastName",
          "initials",
          "fullName",
          "email",
          "friends",
        ],
      };
      const { rows, count } = await Users.findAndCountAll(query);
      // console.log("===============STart=====================");
      // console.log(rows);
      // console.log("====================================");
      const users = rows.map((obj, index, self) => {
        let user = obj.dataValues;
        // console.log(user, "user");
        user = {
          ...user,
          friendsList: [],
        };
        self.forEach((e) => {
          const u = e.dataValues;
          if (user.friends && user.friends.includes(u.id)) {
            user.friendsList.push(u);
          }
        });
        return user;
      });

      // console.log("====================================");
      // console.log(users);
      // console.log("====================================");

      res.http200(users, { count: count });
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
    "/add-book",
    asyncMiddleware(async (req, res) => {
      const { userId, bookId, isReading, isComplete, inQueue, status } =
        req.body;
      let bookStatus = "";
      if (!status) {
        if (isReading) {
          bookStatus = STATUS.Book.reading;
        } else if (isComplete) {
          bookStatus = STATUS.Book.complete;
        } else {
          bookStatus = STATUS.Book.inQueue;
        }
      } else {
        bookStatus = status;
      }
      const [userBook, created] = await UserBooks.findOrCreate({
        where: {
          userId,
          bookId,
        },
        defaults: {
          userId: userId,
          bookId: bookId,
          status: bookStatus,
        },
      });
      if (!created && userBook.status !== bookStatus) {
        const updatedBook = userBook.update({
          status: bookStatus,
        });
      } else if (!created) {
        res.http500("Book Already Added");
      }
      // console.log('user-book ===== 2', userBook);
      res.http200(userBook);
    })
  );

  router.route("/all-books").get(
    asyncMiddleware(async (req, res) => {
      const query = {
        where: {},
        order: sequelizeConfig.Order.Desc(),
      };
      const books = await Books.findAndCountAll(query);
      return res.http200(books.rows, { count: books.count });
    })
  );

  router.param(
    "userId",
    asyncMiddleware(async (req, res, next, userId) => {
      const user = await Users.$$findByPk({ id: +userId });
      req.user = user;
      next();
    })
  );

  router.get(
    "/community",
    asyncMiddleware(async (req, res) => {
      const { count, rows } = await UserBooks.findAndCountAll({
        order: sequelizeConfig.Order.Desc(),
        include: [
          {
            model: Books,
            as: Books.$$singularName,
          },
          {
            model: Users,
            as: Users.$$singularName,
          },
        ],
      });
      const community = rows.map((obj) => obj.dataValues);
      return res.http200(community, {
        count: count,
      });
    })
  );

  router.get(
    "/user-books/:userId",
    asyncMiddleware(async (req, res) => {
      const userId = req.params.userId;
      const userBooks = await UserBooks.findAndCountAll({
        where: {
          userId,
        },
        include: [
          {
            model: Books,
            as: Books.$$singularName,
          },
        ],
      });
      return res.http200(userBooks.rows, { count: userBooks.count });
    })
  );

  router.get(
    "/all-friends/:userId",
    asyncMiddleware(async (req, res) => {
      if (!req.user.friends) {
        return res.http200("Friends Not Found", { count: 0 });
      }
      const splittedIds = req.user.friends.split(",");
      let friendIds = splittedIds.map((id) => +id).filter((id) => !!id);
      let { rows, count } = await UserBooks.findAndCountAll({
        where: {
          userId: {
            [Op.or]: friendIds,
          },
        },
        include: [
          {
            model: Books,
            as: Books.$$singularName,
          },
          {
            model: Users,
            as: Users.$$singularName,
            attributes: [
              "id",
              "firstName",
              "lastName",
              "initials",
              "fullName",
              "email",
              "friends",
            ],
          },
        ],
      });
      const friends = rows
        .map((obj) => obj.dataValues)
        .filter(
          (obj, index, self) =>
            index === self.findIndex((t) => t.userId === obj.userId)
        );
      friendIds = friendIds.filter(
        (id) => friends.findIndex((obj) => obj.userId === id) <= -1
      );
      console.log(friendIds, "ajj");
      let allFriends = friends;
      if (friendIds.length) {
        const users = await Users.findAll({
          where: {
            id: {
              [Op.or]: friendIds,
            },
          },
          attributes: [
            "id",
            "firstName",
            "lastName",
            "initials",
            "fullName",
            "email",
            "friends",
          ],
        });
        allFriends = [
          ...users.map((obj) => {
            return {
              ...obj.dataValues,
              initials: upperCase(
                `${obj.dataValues.firstName[0]}${obj.dataValues.lastName[0]}`
              ),
              fullName: `${obj.dataValues.firstName} ${obj.dataValues.lastName}`,
            };
          }),
          ...friends,
        ];
      }
      return res.http200(allFriends, {
        count: allFriends.length,
      });
    })
  );

  router.get(
    "/book-reading/:userId",
    asyncMiddleware(async (req, res) => {
      const userId = req.params.userId;
      const bookReading = await UserBooks.findAndCountAll({
        where: {
          userId,
          status: STATUS.Book.reading,
        },
        include: [
          {
            model: Books,
            as: Books.$$singularName,
          },
        ],
      });
      return res.http200(bookReading.rows, { count: bookReading.count });
    })
  );

  router.put(
    "/remove-friend/:userId",
    asyncMiddleware(async (req, res) => {
      const { userId, friendId } = req.body;
      const user = req.user;

      // console.log("====================================");
      // console.log(userId, " ", friendId, " req ", req);
      // console.log("====================================");

      if (!user.friends || !user.friends.includes(friendId)) {
        return res.http500("No Friend Found");
      }
      if (user.friends.length <= 2) {
        user.friends = "";
      } else {
        const updatedUserFriends = user.friends.replace(friendId, "");
        user.friends = updatedUserFriends;
      }
      // const friends = user.friends;
      // console.log("user.friends====>>", user.friends);
      const response = user.update({ friends: user.friends });
      return res.http200(user);
    })
  );

  router.put(
    "/add-friend/:userId",
    asyncMiddleware(async (req, res) => {
      const { userId, friendId } = req.body;

      if (req.user.friends?.includes(friendId)) {
        return res.http500("Friend Already Added");
      }
      const friend = await Users.$$findByPk({ id: +friendId });
      if (!friend) {
        return res.http500("Friend Id Invalid");
      }
      let updatedFriends = "";
      if (!req.user.friends?.length) {
        updatedFriends = updatedFriends + friendId;
      } else {
        updatedFriends = req.user.friends + "," + friendId;
      }
      const response = req.user.update({ friends: updatedFriends });
      return res.http200(req.user);
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
