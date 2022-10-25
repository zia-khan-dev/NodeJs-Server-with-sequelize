const { DataTypes } = require("sequelize");
const sequelize = require("../helper/db.config");


const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,  
      }
    ,
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,   
      }
    ,
  
    email: {
      type: DataTypes.STRING,
      unique: true,
        allowNull: false,
      }
    ,
    password: {
        type: DataTypes.STRING,
        allowNull: false,    
      }
    ,
    mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,  
      }
    ,
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin', 'teacher', 'staff'],
      defaultValue: 'user',   
      }
    ,
});

module.exports = User;
