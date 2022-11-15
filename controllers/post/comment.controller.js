const {HttpStatus, CustomMessages} = require("../../helper/statusCode")
const Response = require("../../helper/response");
const Comment = require("../../models/post/Comment.model");

const create = async (req, res) => {
    try {
        const id = res.locals.decodedToken.id;
        const Data = req.body;
        Data["user_id"] = id;

        const post = await Comment.create(Data);
        res.status(HttpStatus.CREATED.code).send(
            
        new Response(true, `COMMENT ${HttpStatus.CREATED.message}`, post)

          
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


const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const comment_id = await Comment.destroy({
            where: {
                id ,
            },
        });

        comment_id
            ? res.status(HttpStatus.OK.code).send(
        new Response(true, `COMMENT ${HttpStatus.DELETED.message}`, comment_id)
                
               )
            : res.status(HttpStatus.NOT_FOUND.code).send(
        new Response(false, `COMMENT ${HttpStatus.NOT_FOUND.message}`, comment_id)
        );
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.error).send(
            new Response(false, `${CustomMessages.MESSAGE.inValid} COMMENT ID`, comment_id)
        );
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = res.locals.decodedToken.id;

        const body = req.body;
        body["user_id"] = user_id;
        console.log("body", body);

    
        const [comment] = await Comment.update(body,
            {
                where: {
                    id:id,
                },
            }
        );

        console.log(comment);
       
        comment
            ? res.status(HttpStatus.UPDATED.code).send(
                new Response(true, `COMMENT ${HttpStatus.UPDATED.message}`, comment)
            )
            : res.status(HttpStatus.NOT_FOUND.code).send({
                  msg: `COMMENT  ${HttpStatus.NOT_FOUND.message}`,
                  
              });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send({
            msg: error.message,
        });
    }
};

module.exports = {
    create,
    update,
    remove,
};
