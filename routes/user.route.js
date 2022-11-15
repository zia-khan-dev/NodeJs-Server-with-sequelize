const user_controller = require("../controllers/user/user.controller");
const user_profile_controller = require("../controllers/user/user_profile.controller");
const user_academic_controller = require("../controllers/user/user_academic.controller");
const user_interest_controller = require("../controllers/user/user_interest.controller");


const express = require("express");
const { requireAuth } = require("../middlewares/auth.middleware");
const {
        validateUser, validateAboutUser,
        validateUserAcademic, validateUserInterest,
} = require("../middlewares/validate.middleware");

const userRouter = express.Router();
userRouter.route("/register")
        .post(user_controller.signUpUser); //To register  a user
userRouter.route("/register/child")
        .post(requireAuth, user_controller.registerChild); //To register  a child by parent
userRouter.route("/login")
        .post(user_controller.userLogin); //To Login users with email and password

userRouter.route("/login-with-otp")
        .post(user_controller.loginWithOtp); //To Login users with otp
userRouter.route("/login-with-otp/verify")
        .post(user_controller.userLoginOtp); //To Login users with otp
userRouter.route("/")
        .get(requireAuth, user_controller.getAllUsers); //To get all the users
userRouter
        .route("/verify-email/:email_token")
        .get(user_controller.verifyEmail); //To verify user's email

//     profile routes starts from here

const profileUserRouter = express.Router();
profileUserRouter.route("/update")
        .post(requireAuth, user_profile_controller.create); //to create about user details by user_id

profileUserRouter.route("/show")
        .get(user_profile_controller.show); //); 


// profileUserRouter.route("/edit")
//         .put(user_profile_controller.update);


// profileUserRouter.route("/delete")
//         .delete(user_profile_controller.remove);


//     user_academic routes starts from here

const userAcademicRouter = express.Router();
userAcademicRouter.route("/create")
        .post(requireAuth, user_academic_controller.create); //to create about user details by user_id

userAcademicRouter.route("/fetch")
        .get(requireAuth, user_academic_controller.getAll);

userAcademicRouter.route("/edit/:id")
        .put(requireAuth, user_academic_controller.update);


userAcademicRouter.route("/delete/:id")
        .delete(requireAuth, user_academic_controller.remove);

//     user_academic routes starts from here

const userInterestRouter = express.Router();
userInterestRouter.route("/create")
        .post(requireAuth, user_interest_controller.create); //to create about user details by user_id

userInterestRouter.route("/show")
        .get(requireAuth, user_interest_controller.show);


userInterestRouter.route("/update/:id")
        .put(user_interest_controller.update);


module.exports = {
        userRouter,
        profileUserRouter, userAcademicRouter,
        userInterestRouter
};
