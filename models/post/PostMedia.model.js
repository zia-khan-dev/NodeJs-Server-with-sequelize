const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../helper/db.config");


const PostMedia = sequelize.define("post_medias", {
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
media_type: {
    type: DataTypes.STRING,
    allowNull: false,
},
post_id:{
    type: DataTypes.STRING,
  }


}, { timestamps: false });



module.exports = PostMedia;
