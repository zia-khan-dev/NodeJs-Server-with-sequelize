'use strict';

module.exports = {
    up: function (queryInterface, DataTypes) {
        return queryInterface.createTable("user_interests", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            }

            ,
            interestId: {
                type: DataTypes.INTEGER,
            }
            ,
            userId: {
                type: DataTypes.INTEGER,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },

            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        });
    },

    down: function (queryInterface, DataTypes) {
        return queryInterface.dropTable("user_interests");
    },
};