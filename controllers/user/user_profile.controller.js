
const UserProfile = require("../../models/user/UserProfile.model");
const { HttpStatus } = require("../../helper/statusCode");
const Response = require("../../helper/response");
const { userProfileValidator } = require("../../validators/user.validators");
const helpers = require("../../helper/functions");



const create = async (req, res) => {
    try {
        const validationResult = await userProfileValidator.validateAsync(req.body);
        const userData = validationResult;
        userData['user_id'] = req.profileActive;

        let about_user = await UserProfile.findOne({
            where: {
                user_id: req.profileActive
            }
        });
        if (about_user) {
            about_user = await about_user.update(userData);
        } else {
            about_user = await UserProfile.create(userData);
        }
        res.status(HttpStatus.CREATED.code).send(
            new Response(true, `USER PROFILE ${HttpStatus.CREATED.message}`, about_user));

    } catch (error) {
        if (error.name.includes('Sequelize')) { //Validation errors
            return helpers.validationHandler(res, error);
        }
        if (error.isJoi === true) {
            return res.status(HttpStatus.BAD_REQUEST.code).json({
                success: false,
                message: error.message
            });
        }
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).json({
            success: false,
            message: error
        });
    }
};
// THIS IS JUST FOR TESTING THAT WE CAN CHECK FOR ALL THE USER_DETAILS IN THE DATABASE
// endpoint: baseurl/about-user/get-all
const getAll = async (req, res) => {
    try {
        const about_user = await UserProfile.findAll();
        about_user
            ? res.status(HttpStatus.OK.code).send(
                new Response(true, `USER PROFILE ${HttpStatus.OK.message}`, about_user)
            )
            : res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(false, `USER PROFILE ${HttpStatus.NOT_FOUND.message}`, about_user)
            )


    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
            new Response(false, error.errors[0].message)
        )
    }
};

const show = async (req, res) => {
    try {
        //const id = res.locals.decodedToken.id;
        const about_user = await UserProfile.findOne({
            where: {
                user_id: req.profileActive,
            },
        });

        about_user
            ? res.status(HttpStatus.OK.code).send(
                new Response(true, `USER PROFILE ${HttpStatus.OK.message}`, about_user)
            )
            : res.status(HttpStatus.NOT_FOUND.message).send(
                new Response(false, `USER PROFILE ${HttpStatus.NOT_FOUND.message}`, about_user)
            );
    } catch (error) {
        res.status(HttpStatus.OK.code).send(
            new Response(false, `USER PROFILE ${HttpStatus.NOT_FOUND.message}`)
        );
    }
};

const update = async (req, res) => {
    try {
        const id = res.locals.decodedToken.id;
        const body = req.body;

        const about_user = await UserProfile.update(body,
            {
                where: {
                    user_id: id,
                },
            }
        );
        console.log("user_profile", about_user);

        about_user
            ? res.status(HttpStatus.UPDATED.code).send(
                new Response(true, `USER PROFILE ${HttpStatus.UPDATED.message}`)
            )
            : res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(false, `USER PROFILE ${HttpStatus.NOT_FOUND.message}`, id)
            );
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
            new Response(false, error.message)
        );
    }
};


const remove = async (req, res) => {
    try {
        const id = res.locals.decodedToken.id;
        const about_user = await UserProfile.destroy({
            where: {
                user_id: id
            }
        });

        // console.log(about_user);

        about_user
            ? res.status(HttpStatus.OK.code).send(
                new Response(true, `USER PROFILE ${HttpStatus.DELETED.message}`)
            )
            : res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(false, `USER PROFILE ${HttpStatus.NOT_FOUND.message}`, about_user)
            );
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.error).send(
            new Response(false, error.message)
        );
    }
};


module.exports = {
    create,
    getAll,
    show,
    remove,
    update,

};