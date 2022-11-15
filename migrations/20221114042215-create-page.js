'use strict';

module.exports = {
    up: function (queryInterface, DataTypes) {
        return queryInterface.createTable("pages", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
            },
            page_type: {
                type: DataTypes.ENUM,
                values: ["School", "University", "Company", "NGO", "Page"]
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            industry: {
                type: DataTypes.STRING,
                allowNull: true
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true
            },
            website: {
                type: DataTypes.STRING,
                allowNull: true
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
        return queryInterface.dropTable("pages");
    },
};