'use strict';

module.exports = {
    up: function (queryInterface, DataTypes) {
        return queryInterface.createTable("comments", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            post_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
            },
            comment: {
                type: DataTypes.TEXT,

            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },

            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci'
        });
    },

    down: function (queryInterface, DataTypes) {
        return queryInterface.dropTable("comments");
    },
};