'use strict';

module.exports = {
    up: function (queryInterface, DataTypes) {
        return queryInterface.createTable("user_posts", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            category: {
                type: DataTypes.ENUM,
                allowNull: false,
                values: ["Status", "Blog", "Projects", "News"],
            },
            user_id: {
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
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci'
        });
    },

    down: function (queryInterface, DataTypes) {
        return queryInterface.dropTable("user_posts");
    },
};