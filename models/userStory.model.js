const { DataTypes } = require("sequelize");
const sequelize = require("../helper/db.config");
const PostMedia = require("./postMedia.model");
const StoryMedia = require("./storyMedia.model");
const User = require("./user.model");

const UserStory = sequelize.define("User_Story", {
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

UserStory.hasMany(StoryMedia, { foreignKey: "storyId", onDelete: "CASCADE" });

module.exports = UserStory;
