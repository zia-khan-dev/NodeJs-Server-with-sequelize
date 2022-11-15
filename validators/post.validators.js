const Joi = require("joi");

const userPostValidator = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    media: Joi.any().optional(),
});
const userStoryValidator = Joi.object({
    title: Joi.string().required(),
    media: Joi.any().optional(),
});

const commentValidator = Joi.object({
    comment: Joi.string().required(),
    comment_id: Joi.string().optional(),
    post_id: Joi.string().optional()
});


const reactionValidator = Joi.object({
    reaction_type: Joi.string().required()
        .valid("Like", "Love", "Care", "Haha", "Wow", "Sad", "Angry"),
    post_id: Joi.string().optional(),
    comment_id: Joi.string().optional()


});

module.exports = {
    userPostValidator, commentValidator, reactionValidator, userStoryValidator
};
