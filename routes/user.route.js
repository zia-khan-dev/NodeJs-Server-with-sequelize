const users = require("../controllers/user.controller");
const express = require("express");
const { requireAuth } = require("../middlewares/auth.middleware");
const validateUser = require("../middlewares/validateUser.middleware");

const userRouter = express.Router();
userRouter.route("/register").post(validateUser, users.createUser); //To register  a user

userRouter.route("/login").post(users.userLogin); //To Login users with email and password

userRouter.route("/").get(requireAuth, users.getAllUsers); //To get all the users

userRouter
    .route("/:id")
    .get(requireAuth, users.getUser) //To get user with specific Id
    .put(validateUser, requireAuth, users.updateUser) //To update a user using specific Id
    .delete(requireAuth, users.deleteUser); //To delete a user using specific Id

module.exports = { userRouter: userRouter };
