
const UserAcademic = require("../../models/user/UserAcademic.model");
const { HttpStatus } = require("../../helper/statusCode");
const Response = require("../../helper/response");
const { userAcademicsValidator } = require("../../validators/user.validators");
const helpers = require("../../helper/functions");

const create = async (req, res) => {

    try {
        const validationResult = await userAcademicsValidator.validateAsync(req.body);
        const userData = validationResult;
        userData['user_id'] = req.profileActive;

        const user_academic = await UserAcademic.create(userData);
        return res.status(HttpStatus.CREATED.code).send(
            new Response(true, `USER ACADMEIC ${HttpStatus.CREATED.message}`, user_academic));

    } catch (error) {
        console.log(error);
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
        const user_academic = await UserAcademic.findAll({
            where: {
                user_id: req.profileActive
            }
        });
        user_academic
            ? res.status(HttpStatus.OK.code).send(
                new Response(true, `USER ACADEMIC ${HttpStatus.OK.message}`, user_academic)
            )
            : res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(false, `USER ACADEMIC ${HttpStatus.NOT_FOUND.message}`, user_academic)
            )


    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
            new Response(false, error)
        )
    }
};

const show = async (req, res) => {
    try {
        const id = res.locals.decodedToken.id;
        const user_academic = await UserAcademic.findOne({
            where: {
                user_id: id,
            },
        });
        user_academic
            ? res.status(HttpStatus.OK.code).send(
                new Response(true, `USER ACADEMIC ${HttpStatus.OK.message}`, user_academic)
            )
            : res.status(HttpStatus.NOT_FOUND.message).send(
                new Response(false, `USER ACADEMIC ${HttpStatus.NOT_FOUND.message}`, user_academic)
            );
    } catch (error) {
        res.status(HttpStatus.OK.code).send(
            new Response(false, `USER ACADEMIC ${HttpStatus.NOT_FOUND.message}`)
        );
    }
};

const update = async (req, res) => {
    try {
        const validationResult = await userAcademicsValidator.validateAsync(req.body);
        const userData = validationResult;
        userData['user_id'] = req.profileActive;

        const [user_academic] = await UserAcademic.update(req.body,
            {
                where: {
                    user_id: req.profileActive,
                    id: req.params.id
                },
            }
        );
        user_academic
            ? res.status(HttpStatus.UPDATED.code).send(
                new Response(true, `USER ACADEMIC ${HttpStatus.UPDATED.message}`)
            )
            : res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(false, `USER ACADEMIC ${HttpStatus.NOT_FOUND.message}`, id)
            );
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


const remove = async (req, res) => {
    try {

        const user_academic = await UserAcademic.destroy({
            where: {
                id: req.params.id,
                user_id: req.profileActive
            }
        });

        console.log(user_academic);

        user_academic
            ? res.status(HttpStatus.OK.code).send(
                new Response(true, `USER ACADEMIC ${HttpStatus.DELETED.message}`)
            )
            : res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(false, `USER ACADEMIC ${HttpStatus.NOT_FOUND.message}`, user_academic)
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
    update,
    remove,

};