const { DataTypes } = require("sequelize");
const sequelize = require("../../helper/db.config");
const User = require("../user/User.model");
const UserInterest = require("../user/UserInterest.model");


const Interest = sequelize.define("interests", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    interest_title: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { timestamps: false });

// Interest.hasMany('user_interests', { foreignKey: 'interest_id' })
// Interest.belongsToMany(User, { through: 'UserInterest' });
// Interest.belongsToMany(Interest, { as: "interests", through: 'UserInterest' });


module.exports = Interest;
