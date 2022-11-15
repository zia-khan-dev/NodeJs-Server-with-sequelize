const {HttpStatus, CustomMessages} = require("../../helper/statusCode")
const UserPost = require("../../models/post/UserPost.model");
const PostMedia = require("../../models/post/PostMedia.model");
const Response = require("../../helper/response");
const { userPostValidator } = require("../../validators/post.validators");
const helpers = require("../../helper/functions");


const create = async (req, res) => {
    try {
        console.log("body", req.body);
        const validationResult = await userPostValidator.validateAsync(req.body);
        const postData = validationResult;
        postData['user_id'] = req.profileActive;
            // ================================================================
    
            const post = await UserPost.create(postData);
    
            const postMedias = [];
            await Promise.all(
                req.files.map(async (media) => {
                    media["post_id"] = post.id;
                    media["file_path"] = media.path;
                    media["media_type"] = "image";
                    const postMedia = await PostMedia.create(media);
                    postMedias.push(postMedia.dataValues);
                })
            );
            post.dataValues["media"] = postMedias;
    
            res.status(HttpStatus.CREATED.code).send(
                
            new Response(false, `POST ${HttpStatus.CREATED.message}`, post));

    } catch (error) {

        if (error.name.includes('Sequelize')) { //Validation errors
            return helpers.validationHandler(res, error);
        }
        if (error.isJoi === true) {
            return res.status(HttpStatus.BAD_REQUEST.code).json({
                success: false,
                message: error.message
            });
        }

        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json({
            success: false,
            message: error
        });


    }
}

const getAll = async (req, res) => {
    try {
        const posts = await UserPost.findAll({
            include: PostMedia,
        });
        posts
            ? res.status(HttpStatus.OK.code).send(
        new Response(true, `POST ${HttpStatus.OK.message}`, posts)
        )
            : res.status(HttpStatus.NOT_FOUND.code).send(
        new Response(false, `POST ${HttpStatus.NOT_FOUND.message}`, posts)
        );
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
            new Response(false, `POST ${error.errors[0].message}`, posts)
            
        );
    }
};

const show = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await UserPost.findOne({
            where: {
                id,
            },
        });
        post
            ? res.status(HttpStatus.OK.code).send(
        new Response(true, `POST ${HttpStatus.OK.message}`, post)
                )
            : res.status(HttpStatus.NOT_FOUND.msg).send(
        new Response(false, `POST ${HttpStatus.NOT_FOUND.message}`, post)
               );
    } catch (error) {
        res.status(HttpStatus.OK.code).send(
        new Response(false, `POST ${error.message}`, post)
        );
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const postId = await UserPost.destroy({
            where: {
                id,
            },
        });

        postId
            ? res.status(HttpStatus.OK.code).send(
        new Response(true, `POST ${HttpStatus.DELETED.message}`, postId)
                
               )
            : res.status(HttpStatus.NOT_FOUND.code).send(
        new Response(false, `POST ${HttpStatus.NOT_FOUND.message}`, postId)
        );
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.error).send(
            new Response(false, `${CustomMessages.MESSAGE.inValid} POST ID`, postId)
        );
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
    create,
    getAll,
    show,
    remove,
};
