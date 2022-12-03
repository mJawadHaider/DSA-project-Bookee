// const { Errors } = global.appTranslations;
const { kebabCase } = require('lodash');

module.exports = function (sequelize, DataTypes) {
    const { STRING, BOOLEAN,TEXT } = DataTypes;
    let _models = {};
    const Questionnaire = sequelize.$$defineModel(
        'Questionnaire',
        {
            test: {
                type: TEXT, 
                get: function () {
                    return JSON.parse(this.getDataValue('test'));
                },
                set: function (value) {
                    this.setDataValue('test', JSON.stringify(value));
                },
            },
            isActive: {
                type: BOOLEAN,
                defaultValue: false,
            },
            type: {
                type:STRING,
            },
            level: {
                type:STRING
            }
        },
        {
            validate: {},
            paranoid: false,
        }
    );

    /* ================== Model Associations ================== */
    Questionnaire.associate = (models) => {
        _models = models;
    };

    /* ================== Class Methods ================== */
    return Questionnaire;
};
