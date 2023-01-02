module.exports = function (sequelize, DataTypes) {
  const { STRING, TEXT, INTEGER, FLOAT } = DataTypes;
  const Books = sequelize.$$defineModel("Books", {
    name: {
      type: STRING,
    },
    author: {
      type: STRING,
      allowNull: false,
    },
    description: {
      type: TEXT,
    },
    image: {
      type: STRING,
    },
    comments: {
      type: STRING,
    },
    rating: {
      type: FLOAT,
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
