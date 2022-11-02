const Joi = require("joi");
const HttpStatus = require("../helper/statusCode");

const schema = Joi.object({
    title: Joi.string().required(),
    media: Joi.array().required(),
});

const validatePost = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(HttpStatus.BAD_REQUEST.code).send({
            msg: error.message,
        });
    }
    next();
};

module.exports = validatePost;
