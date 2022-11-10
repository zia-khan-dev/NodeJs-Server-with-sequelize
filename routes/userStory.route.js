const story = require("../controllers/userStory.controller");
const express = require("express");
const { requireAuth } = require("../middlewares/auth.middleware");
const fileUpload = require("../middlewares/fileUpload.middleware");

const storyRouter = express.Router();

storyRouter.route("/create").post(requireAuth, fileUpload, story.createStory);
storyRouter.route("/").get(requireAuth, story.getAllStories);

storyRouter
    .route("/:id")
    .get(requireAuth, story.getStory)
    .delete(requireAuth, story.deleteStory);

module.exports = { storyRouter };
