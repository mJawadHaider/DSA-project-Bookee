const moment = require('moment');
const { startCase, upperCase } = require('lodash');
const { getHashedPassword, createToken } = global.commonFunctions;
const { getSetMethods } = global.sequelizeFunctions;
const { Roles } = global.appEnums;

module.exports = function (sequelize, DataTypes) {
    const { STRING, ENUM, VIRTUAL } = DataTypes;
    let _models = {};
    const Users = sequelize.$$defineModel(
        'Users',
        {
            firstName: {
                type: STRING,
                allowNull: false,
                ...getSetMethods.call(this, 'firstName'),
            },
            lastName: {
                type: STRING,
                ...getSetMethods.call(this, 'lastName'),
            },
            companyName: {
                type: STRING,
                unique: true,
                validate: {
                    isCompanyName: {
                        msg:'Invalid Company Name!',
                    },
                    isUnique(value) {
                        return Users.$$findOne({
                            query: { where: { companyName: value } },
                            throwError: false
                        }).then(user => { if (user) throw 'Company Name must be unique!'; });
                    }
                },
            },
            education:{
                type: STRING,
            },

            email: {
                type: STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        msg:'Invalid Email!',
                    },
                    isUnique(value) {
                        return Users.$$findOne({
                            query: { where: { email: value } },
                            throwError: false
                        }).then(user => { if (user) throw 'Email must be unique!'; });
                    }
                },
            },
            password: { 
                type: STRING,
                allowNull: false,
                $privateKey: true,
                set: function (value) {
                    this.setDataValue('password', getHashedPassword(value));
                },
            },
            phoneNumber: {
                type: STRING,
                validate: {
                    len: {
                        args: [16],
                        msg:'Phone number length must be equal to 16 charachters!',
                    },
                },
            },
            dob: {
                type: STRING,
            },
            address: {
                type: STRING,
            },
            role: {
                type: ENUM,
                allowNull: false,
                values: [Roles.admin, Roles.company, Roles.candidate,],
                ...getSetMethods.call(this, 'role'),
            },
            level: {
                type: STRING,
            },
            image: {
                type: STRING,
            },
            /* ================== Virtual Keys ================== */
            isAdmin: {
                type: VIRTUAL,
                get: function () {
                    return this.getDataValue('role') === 'admin';
                },
            },
            initials: {
                type: VIRTUAL,
                get: function () {
                    return upperCase(
                        `${this.getDataValue('firstName')[0]}${this.getDataValue('lastName')[0]}`
                    );
                },
            },
            fullName: {
                type: VIRTUAL,
                get: function () {
                    const lastName= this.getDataValue('lastName');
                    return startCase(
                        `${this.getDataValue('firstName')}${lastName ? ` ${lastName}`: ''}`
                    );
                },
            },
            age: {
                type: VIRTUAL,
                get: function () {
                    const dob = this.getDataValue('dob');
                    if (!dob) {
                        return null;
                    }
                    return moment().diff(moment(dob), 'years');
                },
            },
        },
        {
            validate: {},
        }
    );

    /* ================== Model Associations ================== */
    Users.associate = (models) => {
        _models = models;
        Users.hasMany(models.UserAttachments, {
            foreignKey: 'userId',
            as: models.UserAttachments.$$name,
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
