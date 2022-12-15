const moment = require("moment");
const { startCase, upperCase } = require("lodash");
const { getHashedPassword, createToken } = global.commonFunctions;
const { getSetMethods } = global.sequelizeFunctions;
const { ROLES } = global.appEnums;

module.exports = function (sequelize, DataTypes) {
  const { STRING, VIRTUAL, INTEGER } = DataTypes;
  let _models = {};
  const Users = sequelize.define(
    "Users",
    {
      firstName: {
        type: STRING,
        allowNull: false,
        ...getSetMethods.call(this, "firstName"),
      },
      lastName: {
        type: STRING,
        ...getSetMethods.call(this, "lastName"),
      },
      email: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Invalid Email!",
          },
          isUnique(value) {
            return Users.$$findOne({
              query: { where: { email: value } },
              throwError: false,
            }).then((user) => {
              if (user) throw "Email must be unique!";
            });
          },
        },
      },
      password: {
        type: STRING,
        allowNull: false,
        $privateKey: true,
        set: function (value) {
          this.setDataValue("password", getHashedPassword(value));
        },
      },
      role: {
        type: STRING,
        allowNull: false,
        values: [ROLES.admin, ROLES.reader],
        ...getSetMethods.call(this, "role"),
      },
      /* ================== Virtual Keys ================== */
      isAdmin: {
        type: VIRTUAL,
        get: function () {
          return this.getDataValue("role") === "admin";
        },
      },
      isReader: {
        type: VIRTUAL,
        get: function () {
          return this.getDataValue("role") === "reader";
        },
      },
      initials: {
        type: VIRTUAL,
        get: function () {
          return upperCase(
            `${this.getDataValue("firstName")[0]}${
              this.getDataValue("lastName")[0]
            }`
          );
        },
      },
      fullName: {
        type: VIRTUAL,
        get: function () {
          const lastName = this.getDataValue("lastName");
          return startCase(
            `${this.getDataValue("firstName")}${lastName ? ` ${lastName}` : ""}`
          );
        },
      },
    },
    {
      validate: {},
    }
  );

  /* ================== Model Associations ================== */
  Users.associate = (models) => {
    Users.hasMany(models.UserBooks, {
      as: models.Users.$$name,
      foreignKey: "userId",
    });
  };

  /* ================== Instance Methods ================== */
  Users.prototype.createToken = function (obj = {}) {
    return createToken({
      id: this.id,
      email: this.email,
      ...obj,
    });
  };

  return Users;
};
