'use strict';

module.exports = {
    up: function (queryInterface, DataTypes) {
        return queryInterface.createTable("user_profiles", {
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
            about_me: {
                type: DataTypes.TEXT,
            },
            profile_img: {
                type: DataTypes.TEXT,
            }
            ,
            profile_tagline: {
                type: DataTypes.STRING,
            }
            ,
            birthday: {
                type: DataTypes.DATEONLY,
            }
            ,
            nickname: {
                type: DataTypes.STRING,
            }
            ,
            birth_place: {
                type: DataTypes.STRING,
                allowNull: true,
            }
            ,
            lives_in: {
                type: DataTypes.STRING,
                allowNull: true,
            }
            ,
            country: {
                type: DataTypes.STRING,
                allowNull: true,
            }
            ,
            gender: {
                type: DataTypes.STRING,
                allowNull: true,
            }
            ,
            blood_group: {
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
            },
        });
    },

    down: function (queryInterface, DataTypes) {
        return queryInterface.dropTable("user_profiles");
    },
};