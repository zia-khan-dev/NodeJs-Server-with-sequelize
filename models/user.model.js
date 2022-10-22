const { DataTypes } = require("sequelize");
const sequelize = require("../db.config");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNULL: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNULL: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNULL: false,
        len
    },
});

module.exports = User;
