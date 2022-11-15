const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../helper/db.config");
const Interest = require("../master/Interest.model");
const User = require("./User.model");

const UserAcademic = sequelize.define("user_academics", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }
    ,
    user_id: {
        type: DataTypes.INTEGER
    }
    ,
    study_area: {
        type: DataTypes.STRING,
    }
    ,
    institute: {
        type: DataTypes.STRING,
        allowNull: true
    }
    ,
    page_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
    ,
    details: {
        type: DataTypes.TEXT,
    }
    ,
    starting_year: {
        type: DataTypes.STRING,
        allowNull: true,
    }
    ,
    studying_currently: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    ending_year: {
        type: DataTypes.STRING,
        allowNull: true,
    }

});

// UserAcademic.associate = (models) =>{
//   UserAcademic.belongsTo(models.User, {
//     foreignKey: "user_id",
//     onDelete: "CASCADE"
//   })
// }

// UserAcademic.belongsTo(Interest, { foreignKey: "interest_id", targetKey: "interest_id", onDelete: "CASCADE" });


module.exports = UserAcademic;
