const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../helper/db.config");
const StoryMedia = require("./StoryMedia.model");



const Story = sequelize.define("stories", {
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
  
  user_id: {
    type: DataTypes.INTEGER,
},


}, { timestamps: true })


Story.hasMany(StoryMedia, { foreignKey: "story_id", onDelete: "CASCADE" });


module.exports = Story;
