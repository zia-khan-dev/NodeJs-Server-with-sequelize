const UserInterest = require("../../models/user/UserInterest.model");
const Interest = require("../../models/master/Interest.model");
const { HttpStatus } = require("../../helper/statusCode");
const Response = require("../../helper/response");
const User = require("../../models/user/User.model");
const { userInterestValidator } = require("../../validators/user.validators");
const helpers = require("../../helper/functions");

const create = async (req, res) => {

    try {
        const validationResult = await userInterestValidator.validateAsync(req.body);
        const userData = validationResult;
        userData['userId'] = req.profileActive;
        // user_interest
        const user_interest = await UserInterest.create(userData);
        res.status(HttpStatus.CREATED.code).send(
            new Response(true, `USER INTEREST ${HttpStatus.CREATED.message}`, user_interest));

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

const show = async (req, res) => {

    console.log(req.profileActive);
    try {
        
        const user_interest = await User.findAll({  
             where: {
                    id: req.profileActive,
                    
                }, 
            attributes: [], //if you want to get all attributes of user table then pass the column name here
            include: [{
                model:Interest,
                   attributes: ['interest_title'],  //if you want to get all attributes of interest table then pass the column name here
                   through: { attributes: [] }, // if you want to get all attributes of user_interest table then pass the column name here
                  
               }]           
        })

        // console.log(user_interest);
        user_interest
            ? res.status(HttpStatus.OK.code).send(
                new Response(true, `USER INTEREST ${HttpStatus.OK.message}`, user_interest)
            )
            : res.status(HttpStatus.NOT_FOUND.message).send(
                new Response(false, `USER INTEREST ${HttpStatus.NOT_FOUND.message}`, user_interest)
            );
    } catch (error) {
        res.status(HttpStatus.OK.code).send(
            new Response(false, `USER INTEREST ${error}`)
        );
    }
};

// this is for update and create
const update = async (req, res) => {
    try {
        const validationResult = await userInterestValidator.validateAsync(req.body);
        const userData = validationResult;
        userData['userId'] = req.profileActive;

        const [user_interest] = await UserInterest.update(userData,
            {
                where: {
                    userId: req.profileActive,
                    id: req.params.id
                },
            }
        );
        user_interest
            ? res.status(HttpStatus.UPDATED.code).send(
                new Response(true, `USER INTEREST ${HttpStatus.UPDATED.message}`)
            )
            : res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(false, `USER INTEREST ${HttpStatus.NOT_FOUND.message}`)
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




module.exports = {
    create,
    update,
    show,
    // remove,
};