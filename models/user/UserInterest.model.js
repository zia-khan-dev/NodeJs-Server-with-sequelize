const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../helper/db.config");
const Interest = require("../master/Interest.model");
const User = require("./User.model");

const UserInterest = sequelize.define("user_interests", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }
    ,
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    interestId: {
        type: DataTypes.INTEGER,
        references: {
            model: Interest,
            key: "id"
        }
    }
});



module.exports = UserInterest;