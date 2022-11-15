const Joi = require("joi");

const signupValidation = Joi.object({
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

const childRegistrationValidation = Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().required().email(),
    user_name: Joi.string().required(),
    mobile_number: Joi.string().required()
});


const userProfileValidator = Joi.object({
    about_me: Joi.string().required(),
    birthday: Joi.date().required(),
    nickname: Joi.string().required(),
    birth_place: Joi.string().required(),
    lives_in: Joi.string().required(),
    country: Joi.string().required(),
    gender: Joi.string().required().valid("Male", "Female"),
    blood_group: Joi.string().required().valid("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"),
});


const userAcademicsValidator = Joi.object({
    study_area: Joi.string().required(),
    institute: Joi.string().required(),
    details: Joi.string().required(),
    starting_year: Joi.string().required(),
    ending_year: Joi.string().optional(),
    page_id: Joi.number().integer().optional(),
    studying_currently: Joi.boolean().optional()
});


const userInterestValidator = Joi.object({
    interestId: Joi.string().required()
});

module.exports = {
    signupValidation, userProfileValidator,
    userAcademicsValidator, userInterestValidator,
    childRegistrationValidation
};
