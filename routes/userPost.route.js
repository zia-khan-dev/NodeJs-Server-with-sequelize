const post = require("../controllers/userPost.controller");
const express = require("express");
const { requireAuth } = require("../middlewares/auth.middleware");
const validateUser = require("../middlewares/validateUser.middleware");
const validatePost = require("../middlewares/validatePost.middleware");

const postRouter = express.Router();
postRouter.route("/create-post").post(requireAuth, post.createPost); //To register  a user

// postRouter.route("/login").post(users.userLogin); //To Login users with email and password

postRouter.route("/").get(requireAuth, validatePost, post.getAllPosts); //To get all the users

postRouter
    .route("/:id")
    .get(requireAuth, post.getPost) //To get post with specific Id
    //     .put(validateUser, requireAuth, users.updateUser) //To update a user using specific Id
    .delete(requireAuth, post.deletePost); //To delete a user using specific Id

module.exports = { postRouter };
