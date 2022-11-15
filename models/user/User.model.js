const { DataTypes, Sequelize, literal } = require("sequelize");
const sequelize = require("../../helper/db.config");
const UserProfile = require("./UserProfile.model");
const Interest = require("../master/Interest.model");
const UserPost = require("../post/UserPost.model");
const UserAcademic = require("./UserAcademic.model");
const UserInterest = require("./UserInterest.model");

const User = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    ,

    email: {
        type: DataTypes.STRING,
        unique: {
            msg: "This email is already registered"
        },
        allowNull: false,
    }
    ,
    user_name: {
        type: DataTypes.STRING,
        unique: {
            msg: "This username is already registered"
        },
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
        unique: {
            msg: "This mobile number is already registered"
        },
        allowNull: false,
    }
    ,
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
    ,
    is_staff: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
    ,
    parent_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
    ,
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
    ,

    login_otp: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    users_type: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Student", "Professional", "Parent", "Teacher"],
    }
    ,
    activation_token: {
        type: DataTypes.STRING,
    }
    ,
    token_created_at: {
        type: DataTypes.DATE,
        allowNull: true,
    }
    ,
    account_activated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    }

});

User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.password;
    delete values.activation_token;
    delete values.token_created_at;
    delete values.account_activated_at;
    return values;
}

UserInterest.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.id;
    delete values.userId;
    delete values.interestId;
    delete values.createdAt;
    delete values.updatedAt;
    return values;
}

User.hasOne(UserProfile, {
    foreignKey: 'user_id'
});
User.hasMany(UserAcademic, { foreignKey: 'user_id' });
User.hasMany(UserPost, { foreignKey: 'user_id' });
User.hasMany(User, { as: 'children', foreignKey: 'parent_id' });
User.belongsToMany(Interest, { through: 'user_interests' });

module.exports = User;