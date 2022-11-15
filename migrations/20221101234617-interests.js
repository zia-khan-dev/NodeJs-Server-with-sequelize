'use strict';

module.exports = {
    up: function (queryInterface, DataTypes) {
        return queryInterface.createTable("interests", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            }
            ,
            interest_title: {
                type: DataTypes.STRING,
            }
            ,
            interest_category: {
                type: DataTypes.ENUM,
                values: ["Shows", "Music", "Movies", "Books", "Games"]
            }
            ,
        });
    },

    down: function (queryInterface, DataTypes) {
        return queryInterface.dropTable("interests");
    },
};