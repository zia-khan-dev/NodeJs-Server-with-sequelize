const { DataTypes } = require("sequelize");
const sequelize = require("../helper/db.config");
const UserPost = require("./userPost.model");

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
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    is_teacher: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    is_staff: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

User.hasMany(UserPost, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = User;