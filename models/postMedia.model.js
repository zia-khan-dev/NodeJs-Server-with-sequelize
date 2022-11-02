const { DataTypes } = require("sequelize");
const sequelize = require("../helper/db.config");
const UserPost = require("./userPost.model");

const PostMedia = sequelize.define("post_media", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    media_type: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


module.exports = PostMedia;
