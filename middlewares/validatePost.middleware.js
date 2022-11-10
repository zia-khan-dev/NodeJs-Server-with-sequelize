const Joi = require("joi");
const HttpStatus = require("../helper/statusCode");

const schema = Joi.object({
    title: Joi.string().required()
});

const validatePost = (req, res) => {

    const { error } = schema.validate({
        title: req.body.title
    });
    console.log(error);
    if (error) {
        res.status(HttpStatus.BAD_REQUEST.code).send({
            msg: error.message,
        });
        return false;
    }
    return true;
};

module.exports = validatePost;
