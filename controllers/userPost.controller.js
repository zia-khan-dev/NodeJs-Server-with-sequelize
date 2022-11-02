const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HttpStatus = require("../helper/statusCode");
const UserPost = require("../models/userPost.model");
const PostMedia = require("../models/postMedia.model");

const createPost = async (req, res) => {
    try {
        const id = res.locals.decodedToken.id;
        const postData = req.body;
        postData["userId"] = id;

        const post = await UserPost.create(req.body);

        const postMedias = [];
        await Promise.all(
            postData.media.map(async (media) => {
                media["postId"] = post.id;
                const postMedia = await PostMedia.create(media);
                postMedias.push(postMedia.dataValues);
            })
        );
        post.dataValues["media"] = postMedias;

        res.status(HttpStatus.CREATED.code).send({
            msg: `Post ${HttpStatus.CREATED.msg}`,
            post,
        });
    } catch (error) {
        console.log(error);
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

const getAllPosts = async (req, res) => {
    try {
        const posts = await UserPost.findAll({
            include: PostMedia,
        });
        posts
            ? res.status(HttpStatus.OK.code).send({
                  msg: `Post ${HttpStatus.OK.msg}`,
                  posts,
              })
            : res.status(HttpStatus.NOT_FOUND.code).send({
                  msg: `Post ${HttpStatus.NOT_FOUND.msg}`,
                  posts,
              });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send({
            msg: error.errors[0].message,
        });
    }
};

const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await UserPost.findOne({
            where: {
                id,
            },
        });
        post
            ? res.status(HttpStatus.OK.code).send({
                  msg: `Post ${HttpStatus.OK.msg}`,
                  post,
              })
            : res.status(HttpStatus.NOT_FOUND.msg).send({
                  msg: `Post ${HttpStatus.NOT_FOUND.msg}`,
                  post,
              });
    } catch (error) {
        res.status(HttpStatus.OK.code).send({
            msg: `Post ${HttpStatus.NOT_FOUND.msg}`,
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const postId = await UserPost.destroy({
            where: {
                id,
            },
        });

        postId
            ? res.status(HttpStatus.OK.code).send({
                  msg: `Post ${HttpStatus.DELETED.msg}`,
                  userId: postId,
              })
            : res.status(HttpStatus.NOT_FOUND.code).send({
                  msg: `Post ${HttpStatus.NOT_FOUND.msg}`,
                  userId: id,
              });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.error).send({
            msg: "Invalid Post Id",
        });
    }
};

// const updatePost = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const {
//             title,
//             media
//         } = req.body;

//           const postMedias = [];
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
    createPost,
    getAllPosts,
    getPost,
    deletePost,
};
