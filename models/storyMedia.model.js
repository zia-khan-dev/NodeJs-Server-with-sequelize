const { DataTypes } = require("sequelize");
const sequelize = require("../helper/db.config");

const StoryMedia = sequelize.define("story_media", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


module.exports = StoryMedia;
