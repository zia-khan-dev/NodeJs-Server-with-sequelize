const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HttpStatus = require("../helper/statusCode");

const maxAge = 60 * 60;

const createJWT = (id) => {
    return jwt.sign({ id }, process.env.SECRETKEY, {
        expiresIn: maxAge,
    });
};

const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, mobile_number, role } = req.body;
        let hashPassword;
        if (password) {
            const salt = await bcrypt.genSalt();
            hashPassword = await bcrypt.hash(password, salt);
        }
        const user = await User.create({
            first_name ,
            last_name,
            email,
            mobile_number,
            password: hashPassword,
            role : (role ? role : 'user')
        } );

        res.status(HttpStatus.CREATED.code).send({
            msg: `USER ${HttpStatus.CREATED.msg}`,
            user,
        });
    } catch (error) {
        // const errobj = error.errors.map(e => console.log(e.message)) 
        if (error.name === 'SequelizeValidationError') {
            return res.status(HttpStatus.BAD_REQUEST.code).json({
              success: false,
            //   msg: error.errors.map(e => e.message)
              msg: error
            }) 
        }
        else {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json({
              success: false,
            //   msg: error.errors.map(e => e.message)
              msg: error
            })
        }
        
        
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        users
            ? res.status(HttpStatus.OK.code).send({
                  msg: `USER ${HttpStatus.OK.msg}`,
                  users,
              })
            : res.status(HttpStatus.NOT_FOUND.code).send({
                  msg: `USER ${HttpStatus.NOT_FOUND.msg}`,
                  users,
              });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send({
            msg: error.errors[0].message,

        });
    }
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: {
                id,
            },
        });
        user
            ? res.status(HttpStatus.OK.code).send({
                  msg: `USER ${HttpStatus.OK.msg}`,
                  user,
              })
            : res.status(HttpStatus.NOT_FOUND.msg).send({
                  msg: `USER ${HttpStatus.NOT_FOUND.msg}`,
                  user,
              });
    } catch (error) {
        res.status(HttpStatus.OK.code).send({
            msg : `USER ${HttpStatus.NOT_FOUND.msg}`
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = await User.destroy({
            where: {
                id,
            },
        });

        userId
            ? res.status(HttpStatus.DELETED.code).send({
                  msg: `USER ${HttpStatus.DELETED.msg}`,
                  userId,
              })
            : res.status(HttpStatus.NOT_FOUND.code).send({
                  msg: `USER ${HttpStatus.NOT_FOUND.msg}`,
                  userId: id,
              });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.error).send({
            msg: "Invalid User Id",
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, password, mobile_number } = req.body;

        let hashPassword;
        if (password) {
            const salt = await bcrypt.genSalt();
            hashPassword = await bcrypt.hash(password, salt);
        }

        const [user] = await User.update(
           {
            first_name ,
            last_name,
            email,
            mobile_number,
           },
            {
                where: {
                    id,
                },
            }
        );
        user
            ? res.status(HttpStatus.OK.code).send({
                  msg: "USER UPDATED SUCCESSFULLY",
                  user,
              })
            : res.status(HttpStatus.NOT_FOUND.code).send({
                  msg: `USER ${HttpStatus.NOT_FOUND.msg}`,
                  userId: id,
              });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send({
            msg: error,
        });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (user) {
            const {id, role, first_name, last_name} = user;
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                const token = createJWT({id,role,first_name, last_name});
                res.cookie("token", token, {
                    maxAge: maxAge * 6000,
                });
                return res.status(HttpStatus.OK.code).json({
                    message: "User login successfully",
                    userId: user.id,
                    first_name,
                    last_name,
                    role,
                    token: token,
                });
            }

            return res.status(HttpStatus.UNAUTHORIZED.code).send({
                msg: "Invalid user password",
            });
        }
    } else {
        return res.status(HttpStatus.BAD_REQUEST.code).send({
            msg: "email or password not found",
        });
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send({
        msg: "User not found",
    });
};

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    userLogin,
};
