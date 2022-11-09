const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HttpStatus = require("../helper/statusCode");
const StoryMedia = require("../models/storyMedia.model");
const UserStory = require("../models/userStory.model");

const createStory = async (req, res) => {
    try {
        const id = res.locals.decodedToken.id;
        const storyData = req.body;
        storyData["userId"] = id;

        const story = await UserStory.create(req.body);

        const storyMedias = [];
        await Promise.all(
            req.files.map(async (media) => {
                media["storyId"] = story.id;
                media["link"] = media.path;
                const storyMedia = await StoryMedia.create(media);
                storyMedias.push(storyMedia.dataValues);
            })
        );
        story.dataValues["media"] = storyMedias;

        res.status(HttpStatus.CREATED.code).send({
            msg: `Story ${HttpStatus.CREATED.msg}`,
            story,
        });
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(HttpStatus.BAD_REQUEST.code).json({
                success: false,
                msg: error,
            });
        } else {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json({
                success: false,
                msg: error,
            });
        }
    }
};

const getAllStories = async (req, res) => {
    try {
        const stories = await UserStory.findAll({
            include: StoryMedia,
        });
        stories
            ? res.status(HttpStatus.OK.code).send({
                  msg: `Stories ${HttpStatus.OK.msg}`,
                  stories,
              })
            : res.status(HttpStatus.NOT_FOUND.code).send({
                  msg: `Stories ${HttpStatus.NOT_FOUND.msg}`,
                  stories,
              });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send({
            msg: error.errors[0].message,
        });
    }
};

const getStory = async (req, res) => {
    try {
        const { id } = req.params;
        const story = await UserStory.findOne({
            where: {
                id,
            },
        });
        story
            ? res.status(HttpStatus.OK.code).send({
                  msg: `Story ${HttpStatus.OK.msg}`,
                  story,
              })
            : res.status(HttpStatus.NOT_FOUND.msg).send({
                  msg: `Story ${HttpStatus.NOT_FOUND.msg}`,
                  story,
              });
    } catch (error) {
        res.status(HttpStatus.OK.code).send({
            msg: `Story ${HttpStatus.NOT_FOUND.msg}`,
        });
    }
};

const deleteStory = async (req, res) => {
    try {
        const { id } = req.params;
        const storyId = await UserStory.destroy({
            where: {
                id,
            },
        });

        storyId
            ? res.status(HttpStatus.OK.code).send({
                  msg: `Story ${HttpStatus.DELETED.msg}`,
                  storyId: storyId,
              })
            : res.status(HttpStatus.NOT_FOUND.code).send({
                  msg: `Story ${HttpStatus.NOT_FOUND.msg}`,
                  storyId: id,
              });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.error).send({
            msg: "Invalid Story Id",
        });
    }
};

// const updateStory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const {
//             title
//         } = req.body;

//           const storyMedias = [];
//           await Promise.all(
//               media.map(async (media) => {
//                   media["postId"] = post.id;
//                   const postMedia = await PostMedia.findAll()
//                   const postMedia = await PostMedia.create(media);
//                   postMedias.push(postMedia.dataValues);
//               })
//           );
//         const [post] = await UserPost.update(
//             {
//                 title
//             },
//             {
//                 where: {
//                     id,
//                 },
//             }
//         );

//         // const [media] = PostMedia.update({

//         // })
//         user
//             ? res.status(HttpStatus.OK.code).send({
//                   msg: "USER UPDATED SUCCESSFULLY",
//                   user,
//               })
//             : res.status(HttpStatus.NOT_FOUND.code).send({
//                   msg: `USER ${HttpStatus.NOT_FOUND.msg}`,
//                   userId: id,
//               });
//     } catch (error) {
//         res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send({
//             msg: error,
//         });
//     }
// };

module.exports = {
    createStory,
    getAllStories,
    getStory,
    deleteStory,
};
