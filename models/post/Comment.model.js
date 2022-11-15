const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../helper/db.config");
const UserPost = require("./UserPost.model");


const Comment = sequelize.define("comments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  post_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING,
  },
  comment: {
    type: DataTypes.TEXT,
  },
  comment_id: {
    type: DataTypes.STRING,
  defaultValue: "0",
  }

}, {timestamps: true}, 
{charset: 'utf8',
collate: 'utf8_general_ci'})


// Comment.hasOne(UserPost, { foreignKey: "post_id", onDelete: "CASCADE" });

module.exports = Comment;
