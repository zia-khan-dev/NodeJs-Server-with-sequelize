const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = require("./helper/db.config");

const { userRouter,
    profileUserRouter,
    userAcademicRouter, userInterestRouter,
} = require("./routes/user.route");

const {
    userPostRouter, commentRouter,
    postReactionRouter, commentReactionRouter,
    userStoryRouter } = require("./routes/post.route");

const {
    interestRouter } = require("./routes/master.route");
// const { aboutUserRouter } = require("./routes/aboutUser.route");
const { requireAuth } = require("./middlewares/auth.middleware");




const port = process.env.PORT || 3000;
const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/user/profile", requireAuth, profileUserRouter);
app.use("/user/academics", requireAuth, userAcademicRouter);
app.use("/user/interest", requireAuth, userInterestRouter);
app.use("/master/interest", requireAuth, interestRouter);
app.use("/post", requireAuth, userPostRouter);
app.use("/post/reaction", requireAuth, postReactionRouter);
app.use("/post/comment", requireAuth, commentRouter);
app.use("/post/comment/reaction", requireAuth, commentReactionRouter);
app.use("/story", requireAuth, userStoryRouter);
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");

        app.listen(port, () => {
            console.log(`App is running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Unable to connect to the database: ", error);
    });
