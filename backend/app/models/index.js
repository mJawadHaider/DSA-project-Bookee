'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { singular } = require('pluralize');
const { startCase, snakeCase, camelCase } = require('lodash');

const config = require(`${global.paths.config}/database.js`);
const { getFields } = require(`${global.paths.lib}/sequelize`);

const { database, username, password } = config;
const basename = path.basename(__filename);

const Errors = {
    InvalidId: 'Invalid $$modelName id!',
    NotFound: '$$modelName not found against this id!',
};

function $translate(key, mappings) {
    Object.keys(mappings).forEach(
        (mapKey) => (key = key.replace(`$$${mapKey}`, mappings[mapKey]))
    );
    return key;
}

Sequelize.prototype.$$defineModel = function (
    modelName = '',
    fields = {},
    config = {}
) {
    const model = this.define(
        snakeCase(modelName),
        { ...getFields(Sequelize.DataTypes, fields) },
        {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            ...(config.paranoid ? { deletedAt: 'deletedAt' } : {}),
            ...config,
        }
    );

    model.$$singularName = singular(model.name);
    model.$$name = startCase(camelCase(model.name)).replace(/ /g, '');
    model.$$singularNameInStartCase = startCase(model.$$singularName);

    model.__proto__.$$findOne = function ({
        query = {},
        options = {},
        throwError = true,
        error = '',
    }) {
        return this.findOne(query, options).then((res) => {
            if (!res && throwError) {
                return Promise.reject({
                    error:
            error ||
            $translate(Errors.NotFound, {
                modelName: this.$$singularNameInStartCase,
            }),
                    statusCode: 400,
                });
            }
            return res;
        });
    };

    model.__proto__.$$findByPk = function ({
        id,
        throwError = true,
        error = '',
    }) {
        return this.findByPk(id).then((res) => {
            if (!res && throwError) {
                return Promise.reject({
                    error:
            error ||
            $translate(Errors.InvalidId, {
                modelName: this.$$singularNameInStartCase,
            }),
                    statusCode: 400,
                });
            }
            return res;
        });
    };

    model.__proto__.$$bulkCreate = function (data = []) {
        return Promise.all(
            data.map(
                (item) =>
                    new Promise((resolve, reject) => {
                        this.create(item)
                            .then((res) => resolve(res))
                            .catch((e) => reject(e));
                    })
            )
        );
    };

    model.prototype.toJSON = function () {
        const _this = Object.assign({}, this.get());
        Object.keys(model.rawAttributes)
            .filter((field) => model.rawAttributes[field].$privateKey)
            .forEach((field) => delete _this[field]);
        return _this;
    };

    return model;
};

const sequelize = new Sequelize(database, username, password, config);
sequelize
    .authenticate()
    .then(() =>
        global.log.info('Database connection has been established successfully.')
    )
    .done();
sequelize.sync({
    alter: true,
    // force:true,
});

function getNormalizedNameOfModel(modelName) {
    return startCase(modelName).replace(/\s/g, '');
}

let db = {};
fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
        );
    })
    .forEach((file) => {
        const model = sequelize['import'](path.join(__dirname, file));
        const normalizedName = getNormalizedNameOfModel(model.name);
        db[normalizedName] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db = {
    ...db,
    sequelize: sequelize,
    Sequelize: Sequelize,
};

module.exports = db;
