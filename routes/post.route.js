const user_post_controller = require("../controllers/post/user_post.controller");
const story_controller = require("../controllers/post/story.controller");
const comment_controller = require("../controllers/post/comment.controller");
const comment_reaction_controller = require("../controllers/post/comment_reaction.controller");
const post_reaction_controller = require("../controllers/post/post_reaction.controller");


const express = require("express");
// const {
//         validateComment, validateReaction       
// } = require("../middlewares/validate.middleware");
const fileUpload = require("../middlewares/fileUpload.middleware");


const userPostRouter = express.Router();
userPostRouter.route("/create")
        .post(fileUpload, user_post_controller.create); 
   
        userPostRouter.route("/show/:id")
        .get(user_post_controller.show); 

        userPostRouter.route("/lists")
        .get(user_post_controller.getAll); 
        
        userPostRouter.route("/delete/:id")
        .delete(user_post_controller.remove); 

        

        
const commentRouter = express.Router();
commentRouter.route("/create")
        .post(comment_controller.create); 
   
        commentRouter.route("/update/:id")
        .put(comment_controller.update); 
        
        commentRouter.route("/delete/:id")
        .delete(comment_controller.remove); 


const commentReactionRouter = express.Router();
commentReactionRouter.route("/create")
        .post(comment_reaction_controller.create); 

        commentReactionRouter.route("/update/:id")
        .put(comment_reaction_controller.update); 
        
        commentReactionRouter.route("/delete/:id")
        .delete(comment_reaction_controller.remove); 
        
const postReactionRouter = express.Router();
postReactionRouter.route("/create")
        .post(post_reaction_controller.create); 
   
        postReactionRouter.route("/update/:id")
        .put(post_reaction_controller.update); 
        
        postReactionRouter.route("/delete/:id")
        .delete(post_reaction_controller.remove); 
        

        const userStoryRouter = express.Router();
userStoryRouter.route("/create")
        .post(fileUpload, story_controller.create); 
        
        userStoryRouter.route("/delete/:id")
        .delete(story_controller.remove); 
module.exports = { 
                userPostRouter, commentRouter, 
                postReactionRouter, commentReactionRouter, userStoryRouter
            };
            