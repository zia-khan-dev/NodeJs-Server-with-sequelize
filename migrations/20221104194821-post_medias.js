'use strict';

module.exports = {
    up: function (queryInterface, DataTypes) {
        return queryInterface.createTable("post_medias", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            file_path: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            media_type: {
                type: DataTypes.ENUM,
                values: ["video", "image"],
            },
            post_id: {
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
        return queryInterface.dropTable("post_medias");
    },
};