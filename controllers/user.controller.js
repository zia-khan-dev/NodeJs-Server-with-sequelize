const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const maxAge = 60 * 60;

const createJWT = (id) => {
    return jwt.sign({ id }, process.env.SECRETKEY, {
        expiresIn: maxAge,
    });
};

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        let hashPassword;
        if (password) {
            const salt = await bcrypt.genSalt();
            hashPassword = await bcrypt.hash(password, salt);
        }
        const user = await User.create({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: hashPassword,
        });
        res.status(201).send({
            msg: "User created successfully",
            user,
        });
    } catch (error) {
        res.status(500).send({
            msg: error.errors[0].message,
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        users
            ? res.status(200).send({
                  msg: "All Users fetch successfully",
                  users,
              })
            : res.status(200).send({
                  msg: "User not found",
                  users,
              });
    } catch (error) {
        res.status(500).send({
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
            ? res.status(200).send({
                  msg: "User fetch successfully",
                  user,
              })
            : res.status(200).send({
                  msg: "User not found",
                  user,
              });
    } catch (error) {
        res.status(500).send({
            msg: error.errors[0].message,
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
            ? res.status(200).send({
                  msg: "User deleted successfully",
                  userId,
              })
            : res.status(200).send({
                  msg: "User not found",
                  userId: id,
              });
    } catch (error) {
        res.status(500).send({
            msg: "Invalid User Id",
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, password } = req.body;

        let hashPassword;
        if (password) {
            const salt = await bcrypt.genSalt();
            hashPassword = await bcrypt.hash(password, salt);
        }

        const [user] = await User.update(
            {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: hashPassword,
            },
            {
                where: {
                    id,
                },
            }
        );
        user
            ? res.status(200).send({
                  msg: "User updated successfully",
                  user,
              })
            : res.status(200).send({
                  msg: "User not found",
                  userId: id,
              });
    } catch (error) {
        res.status(500).send({
            msg: "Invalid User Id",
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
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                const token = createJWT(user.id);
                res.cookie("token", token, {
                    maxAge: maxAge * 6000,
                });
                return res.status(200).json({
                    message: "User login successfully",
                    userId: user.id,
                });
            }

            return res.status(401).send({
                msg: "Invalid user password",
            });
        }
    } else {
        return res.status(400).send({
            msg: "email or password not found",
        });
    }

    res.status(500).send({
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
