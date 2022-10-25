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
        validate: {
          notNull: {
            msg: 'Please enter your first name'
          }
        }    
      }
    ,
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter your last name'
          }
        }    
      }
    ,
  
    email: {
      type: DataTypes.STRING,
      unique: true,
        allowNull: false,
        validate: {
          isEmail: { args: true, msg: 'email format is not correct' },
          notNull: { args: true, msg: 'email can\'t be empty' },
          notEmpty: { args: true, msg: 'email can\'t be empty string' },
      }
      }
    ,
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          validatePassword: function(password) {
                        if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(password))) {
                            throw new Error('The password must contain at least 8 and maximum 12 characters including at least 1 uppercase, 1 lowercase, one number and one special character.');
                        }
                    }
                },      
      }
    ,
    mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter your mobile number'
          }
        }    
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
