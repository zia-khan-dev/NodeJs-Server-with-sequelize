const post = require("../controllers/userPost.controller");
const express = require("express");
const { requireAuth } = require("../middlewares/auth.middleware");
const fileUpload = require("../middlewares/fileUpload.middleware");

const postRouter = express.Router();

postRouter.route("/create").post(requireAuth, fileUpload, post.createPost);
postRouter.route("/").get(requireAuth, post.getAllPosts);

postRouter
    .route("/:id")
    .get(requireAuth, post.getPost)
    .delete(requireAuth, post.deletePost);

module.exports = { postRouter };
