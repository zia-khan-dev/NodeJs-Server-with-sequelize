const { DataTypes } = require("sequelize");
const sequelize = require("../helper/db.config");
const PostMedia = require("./postMedia.model");
const User = require("./user.model");

const UserPost = sequelize.define("User_Post", {
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
});

UserPost.hasMany(PostMedia, { foreignKey: "postId", onDelete: "CASCADE" });

module.exports = UserPost;
