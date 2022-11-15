const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../helper/db.config");
const Comment = require("./Comment.model");
const PostMedia = require("./PostMedia.model");


const UserPost = sequelize.define("user_posts", {
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
  category: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Status", "Blog","Projects", "News"],
  },
  user_id: {
    type: DataTypes.INTEGER,
},


}, { timestamps: true })


UserPost.hasMany(PostMedia, { foreignKey: "post_id", onDelete: "CASCADE" });
UserPost.hasMany(Comment, { foreignKey: "post_id", onDelete: "CASCADE" });

module.exports = UserPost;
