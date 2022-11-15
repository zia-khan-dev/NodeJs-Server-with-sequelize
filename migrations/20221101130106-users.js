'use strict';

module.exports = {
    up: function (queryInterface, DataTypes) {
        return queryInterface.createTable("users", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            full_name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
            ,
            user_name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            }
            ,
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            }
            ,
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            }
            ,
            mobile_number: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            }
            ,
            is_admin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            }
            ,
            is_staff: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            }
            ,
            parent_id: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
            ,
            is_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            }
            ,
            login_otp: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            users_type: {
                type: DataTypes.ENUM,
                allowNull: false,
                values: ["Student", "Professional", "Parent", "Teacher"],
            }
            ,
            activation_token: {
                type: DataTypes.STRING,
            }
            ,
            token_created_at: {
                type: DataTypes.DATE,
                allowNull: true,
            }
            ,
            account_activated_at: {
                type: DataTypes.DATE,
                allowNull: true,
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
        return queryInterface.dropTable("users");
    },
};