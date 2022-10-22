const users = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/auth.middleware");

router.get("/users", requireAuth, users.getAllUsers); //To get all the users
router.post("/user", users.createUser); //To create a User
router.get("/user/:id", requireAuth, users.getUser); //To get user with specific Id
router.put("/user/:id", requireAuth, users.updateUser); //To update a user using specific Id
router.delete("/user/:id", requireAuth, users.deleteUser); //To deleted a user with specific Id
router.post("/user/login", users.userLogin); //Login a user to work all above task

module.exports = { userRouter: router };
