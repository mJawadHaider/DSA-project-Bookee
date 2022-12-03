const { BOOLEAN } = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const { STRING, INTEGER,DECIMAL } = DataTypes;
    const TestDetail = sequelize.$$defineModel(
        'TestDetail',
        {
            testId: {
                type: INTEGER,
                allowNull: false,
                references: {
                    model: 'questioner',
                    key: 'id',
                },
            },
            userId: {
                type: INTEGER,
                allowNull: false,
            },
            status: {
                type: BOOLEAN,
            },
            description: {
                type: STRING,
            },
        }
    );
    TestDetail.associate = (models) => {
        // TestDetail.belongsTo(models.Reservations, {
        //     foreignKey: 'reservationId',
        //     as: models.Reservations.$$singularName,
        // });
       
    };
    return TestDetail;
};
