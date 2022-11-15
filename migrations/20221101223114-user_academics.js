'use strict';

module.exports = {
    up: function (queryInterface, DataTypes) {
        return queryInterface.createTable("user_academics", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            }
            ,
            user_id: {
                type: DataTypes.INTEGER,

            }
            ,
            study_area: {
                type: DataTypes.STRING,
            }
            ,
            institute: {
                type: DataTypes.STRING,
            }
            ,
            page_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
            ,
            details: {
                type: DataTypes.TEXT,
            }
            ,
            starting_year: {
                type: DataTypes.STRING,
                allowNull: true,
            }
            ,
            studying_currently: {
                type: DataTypes.BOOLEAN,
                defaultValue: 0
            },
            ending_year: {
                type: DataTypes.STRING,
                allowNull: true,
            }
            ,
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },

            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            }
        });
    },

    down: function (queryInterface, DataTypes) {
        return queryInterface.dropTable("user_academics");
    },
};