const Joi = require("joi");
const HttpStatus = require("../helper/statusCode");

const schema = Joi.object({
    title: Joi.string().required(),
    media: Joi.required(),
});

const validateStory = (req, res) => {
    console.log(req.files[0]);
    const { error } = schema.validate({
        title: req.body.title,
        media: req.files[0],
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

module.exports = validateStory;
