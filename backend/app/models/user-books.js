
const { STATUS } = global.appEnums;

module.exports = function (sequelize, DataTypes) {
  const { INTEGER, STRING, VIRTUAL } = DataTypes;
  const UserBooks = sequelize.$$defineModel("UserBooks", {
    userId: {
      type: INTEGER,
      allowNull: false
    },
    bookId: {
      type: INTEGER,
      allowNull: false
    },
    status: {
      type: STRING,
      allowNull: false,
    },
    /* ================== Virtual Keys ================== */
    isReading: {
      type: VIRTUAL,
      get: function () {
        return this.getDataValue("status") === STATUS.Book.reading;
      },
    },
    isComplete: {
      type: VIRTUAL,
      get: function () {
        return this.getDataValue("status") === STATUS.Book.complete;
      },
    },
    inQueue: {
      type: VIRTUAL,
      get: function () {
        return this.getDataValue("status") === STATUS.Book.inQueue;
      },
    },
  });

  /* ================== Model Associations ================== */
  UserBooks.associate = (models) => {
    UserBooks.belongsTo(models.Users, {
      foreignKey: "userId",
      as: models.Users.$$singularName,
    });
    UserBooks.belongsTo(models.Books, {
      foreignKey: "bookId",
      as: models.Books.$$singularName,
    });
  };
  return UserBooks;
};
