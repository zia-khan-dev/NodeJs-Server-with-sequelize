const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../helper/db.config");


const StoryMedia = sequelize.define("story_medias", {
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

story_id:{
    type: DataTypes.INTEGER,  
  }


}, { timestamps: false });



module.exports = StoryMedia;
