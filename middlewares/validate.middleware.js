const Joi = require("joi");
const HttpStatus = require("../helper/statusCode");

const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string()
        .required()
        .min(8)
        .max(12)
        .pattern(
            new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])")
        ),
    mobile_number: Joi.string().required(),
    role: Joi.string(),
});

const validate = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        if (error.details[0].type == 'string.pattern.base') {
            return res.status(HttpStatus.BAD_REQUEST.code).send({
                msg: "Password mush have 1 special character, one upper & lower case character, one number and 8 to 12 character length",
            });
        }
        return res.status(HttpStatus.BAD_REQUEST.code).send({
            msg: error.message,
        });
    }
    next()
}

module.exports = validate;
