module.exports = function (sequelize, DataTypes) {
  const { STRING, INTEGER, DECIMAL } = DataTypes;
  const Books = sequelize.$$defineModel("Books", {
    name: {
      type: STRING,
    },
    author: {
      type: STRING,
      allowNull: false,
    },
    description: {
      type: STRING,
    },
    comments: {
      type: STRING,
    },
    ratings: {
      type: DECIMAL,
    },
    genre: {
      type: STRING,
    },
  });

  /* ================== Model Associations ================== */
  Books.associate = (models) => {
    Books.hasMany(models.UserBooks, {
      as: models.Books.$$name,
      foreignKey: "bookId",
    });
  };
  return Books;
};
