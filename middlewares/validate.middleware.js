const Joi = require("joi");
const { HttpStatus, CustomMessages } = require("../helper/statusCode");
const User = require("../models/user/User.model");
const Response = require("../helper/response");


const isEmailExist = async (req, res, next) => {

    const { email } = req.body;
    const emailFound = await User.findOne({
        where: {
            email: email,

        },
    });
    if (!emailFound) {
        res.status(HttpStatus.NOT_FOUND.code).send(
            new Response(false, `EMAIL ${HttpStatus.NOT_FOUND.message}`)
        );
    } else {
        next();
    }
};
const isPhoneExist = async (req, res, next) => {

    const { mobile_number } = req.body;
    const phoneNumberFound = await User.findOne({
        where: {
            mobile_number,

        },
    });
    if (!phoneNumberFound) {
        res.status(HttpStatus.NOT_FOUND.code).send(
            new Response(false, `MOBILE NUMBER ${HttpStatus.NOT_FOUND.message}`))
    } else {
        next();
    }
};


const userSchema = Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().required().email(),
    user_name: Joi.string().required(),

    password: Joi.string()
        .required()
        .min(8)
        .max(12)
        .pattern(
            new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])")
        ),
    mobile_number: Joi.string().required(),
    users_type: Joi.string().required().valid("Student", "Professional", "Parent", "Teacher"),
});

const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        if (error.details[0].type == 'string.pattern.base') {
            return res.status(HttpStatus.BAD_REQUEST.code).send(
                new Response(false, `${error}`));
        }
        return res.status(HttpStatus.BAD_REQUEST.code).send({
            success: false,
            message: error.message
        });
    }
    next()
}


const aboutUserSchema = Joi.object({
    about_me: Joi.string().required(),
    birthday: Joi.date().required(),
    nickname: Joi.string().required(),
    age: Joi.string().optional(),
    birth_place: Joi.string().required(),
    lives_in: Joi.string().required(),
    country: Joi.string().required(),
    gender: Joi.string().required(),
    mobile_number: Joi.string().optional(),
    blood_group: Joi.string().required(),
});

const validateAboutUser = (req, res, next) => {
    const { error } = aboutUserSchema.validate(req.body);
    if (error) {

        return res.status(HttpStatus.BAD_REQUEST.code).send({
            success: false,
            message: error.message
        });
    }
    next()
}


const userAcademicSchema = Joi.object({
    title: Joi.string().required(),
    institute: Joi.string().required(),
    details: Joi.string().required(),
    institute_image: Joi.string().optional(),
    starting_year: Joi.string().required(),
    ending_year: Joi.string().required(),
});

const validateUserAcademic = (req, res, next) => {
    const { error } = userAcademicSchema.validate(req.body);
    if (error) {

        return res.status(HttpStatus.BAD_REQUEST.code).send({
            success: false,
            message: error.message
        });
    }
    next()
}


const userInterestSchema = Joi.object({
    interest_id: Joi.string().required()
});

const validateUserInterest = (req, res, next) => {
    const { error } = userInterestSchema.validate(req.body);
    if (error) {

        return res.status(HttpStatus.BAD_REQUEST.code).send({
            success: false,
            message: error.message
        });
    }
    next()
}
const userPostSchema = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    media: Joi.any().optional(),
});

const validateUserPost = (req, res, next) => {
    const { error } = userPostSchema.validate(req.body);
    if (error) {

        return res.status(HttpStatus.BAD_REQUEST.code).send({
            success: false,
            message: error.message
        });
    }
    next()
}
const commentSchema = Joi.object({
    comment: Joi.string().required(),
    comment_id: Joi.string().optional(),
    post_id: Joi.string().optional()
});

const validateComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body);
    if (error) {

        return res.status(HttpStatus.BAD_REQUEST.code).send({
            success: false,
            message: error.message
        });
    }
    next()
}
const reactionSchema = Joi.object({
    reaction_type: Joi.string().required()
        .valid("Like", "Love", "Care", "Haha", "Wow", "Sad", "Angry"),
    post_id: Joi.string().optional(),
    comment_id: Joi.string().optional()


});

const validateReaction = (req, res, next) => {
    const { error } = reactionSchema.validate(req.body);
    if (error) {

        return res.status(HttpStatus.BAD_REQUEST.code).send({
            success: false,
            message: error.message
        });
    }
    next()
}

module.exports = {
    isEmailExist, isPhoneExist,
    validateUser, validateAboutUser,
    validateUserAcademic, validateUserInterest,
    validateUserPost, validateComment, validateReaction

};
