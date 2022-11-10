const Joi = require("joi");
const HttpStatus = require("../helper/statusCode");

const schema = Joi.object({
    title: Joi.string().required(),
    media: Joi.required(),
});

const validatePost = (req, res) => {
    // console.log(req.files[0]);
    const isFilesExist = () => {
        if (req.files) {
        return true
        }
        return false;
    }
    const { error } = schema.validate({
        title: req.body.title,
        media: isFilesExist()
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
