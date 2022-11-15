const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../helper/db.config");
const PostMedia = require("./PostMedia.model");
const UserPost = require("./UserPost.model");


const CommentReaction = sequelize.define("comment_reactions", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    comment_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id:{
      type: DataTypes.STRING,
    },
    reaction_type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Like", "Love","Care", "Haha", "Wow", "Sad", "Angry" ],
    },

}, { timestamps: false })


// Reaction.hasMany(UserPost, { foreignKey: "post_id", onDelete: "CASCADE" });

module.exports = CommentReaction;
