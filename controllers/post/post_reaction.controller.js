const {HttpStatus, CustomMessages} = require("../../helper/statusCode")
const PostReaction = require("../../models/post/PostReaction.model");
const Response = require("../../helper/response");


const create = async (req, res) => {
    try {
        const id = res.locals.decodedToken.id;
        const postData = req.body;
        postData["user_id"] = id;

        const post = await PostReaction.create(postData);

        res.status(HttpStatus.CREATED.code).send(
            
        new Response(false, `POST REACTION ${HttpStatus.CREATED.message}`, post)

          
        );
    } catch (error) {
        console.log(error);
        if (error.name === "SequelizeValidationError") {
            return res.status(HttpStatus.BAD_REQUEST.code).send(
        new Response(false, `${error}`));
        } else {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
        new Response(false, `${error}`));
        }
    }
};

// const getAll = async (req, res) => {
//     try {
//         const posts = await UserPost.findAll({
//             include: PostMedia,
//         });
//         posts
//             ? res.status(HttpStatus.OK.code).send(
//         new Response(true, `POST ${HttpStatus.OK.message}`, posts)
//         )
//             : res.status(HttpStatus.NOT_FOUND.code).send(
//         new Response(false, `POST ${HttpStatus.NOT_FOUND.message}`, posts)
//         );
//     } catch (error) {
//         res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
//             new Response(false, `POST ${error.errors[0].message}`, posts)
            
//         );
//     }
// };

// const show = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const post = await UserPost.findOne({
//             where: {
//                 id,
//             },
//         });
//         post
//             ? res.status(HttpStatus.OK.code).send(
//         new Response(true, `POST ${HttpStatus.OK.message}`, post)
//                 )
//             : res.status(HttpStatus.NOT_FOUND.msg).send(
//         new Response(false, `POST ${HttpStatus.NOT_FOUND.message}`, post)
//                );
//     } catch (error) {
//         res.status(HttpStatus.OK.code).send(
//         new Response(false, `COMMENT REACTION ${error.message}`, post)
//         );
//     }
// };

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = res.locals.decodedToken.id;
        const body = req.body;
        body["user_id"] = user_id;
        
        
        const [comment] = await PostReaction.update(body
            ,
            {
                where: {
                    id,
                },
            }
        );

       
        comment
            ? res.status(HttpStatus.UPDATED.code).send(
                new Response(true, `POST REACTION ${HttpStatus.UPDATED.message}`, comment)
            )
            : res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(false, `POST ${HttpStatus.NOT_FOUND.message}`, comment)               
              );
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send({
            msg: error.message,
        });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const comment_reaction = await PostReaction.destroy({
            where: {
                id,
            },
        });

        comment_reaction
            ? res.status(HttpStatus.OK.code).send(
        new Response(true, `POST REACTION ${HttpStatus.DELETED.message}`, comment_reaction)
                
               )
            : res.status(HttpStatus.NOT_FOUND.code).send(
        new Response(false, `POST REACTION ${HttpStatus.NOT_FOUND.message}`, comment_reaction)
        );
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.error).send(
            new Response(false, `${CustomMessages.MESSAGE.inValid} POST REACTION ID`, comment_reaction)
        );
    }
};



module.exports = {
    create,
    remove,
    update
};
