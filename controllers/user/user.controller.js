const User = require('../../models/user/User.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { HttpStatus, CustomMessages, EmailSubjects } = require("../../helper/statusCode");
const Response = require("../../helper/response");
const { Op } = require("sequelize");
const crypto = require("crypto");
const helpers = require("../../helper/functions");
const { signupValidation, childRegistrationValidation } = require("../../validators/user.validators");
const UserProfile = require('../../models/user/UserProfile.model');


const maxAge = 60 * 60;
const createJWT = (user) => {
    return jwt.sign(user, process.env.SECRETKEY, {
        expiresIn: maxAge,
    });
};

const signUpUser = async (req, res) => {
    try {
        const validationResult = await signupValidation.validateAsync(req.body);
        var { full_name, email, user_name, password, mobile_number, users_type } = validationResult;
        var email_token = crypto.randomBytes(64).toString('hex');
        let hashPassword;
        if (password) {
            const salt = await bcrypt.genSalt();
            hashPassword = await bcrypt.hash(password, salt);
        }
        const user = await User.create({
            full_name,
            email,
            user_name,
            mobile_number,
            password: hashPassword,
            users_type,
            token_created_at: (new Date().toLocaleString('en-US', { hour12: false })),
            activation_token: email_token,
        });

        res.status(HttpStatus.CREATED.code).send(
            new Response(true, `USER ${HttpStatus.CREATED.message}`, user));

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
            message: error.errors.map(e => e.message)
        })


    }

    let mailOptions = {
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
        to: email, //  email receiver
        subject: EmailSubjects.accountVerification,
        template: 'account_verification',
        context: {
            name: full_name,
            activation_link: `http://${req.headers.host}/user/verify-email/${email_token}`
        }
    };
    try {
        helpers.sendEmail(mailOptions);
    } catch (err) {
        console.log('Error occured while sending email in the signup function: ' + err)
    }
};


const verifyEmail = async (req, res) => {
    const { email_token } = req.params;

    let user = await User.findOne({ activation_token: email_token });
    try {
        if (!email_token) {
            new Response(false, `${CustomMessages.MESSAGE.inValid} TOKEN`)
        }

        [user] = await User.update(
            {
                account_activated_at: (new Date().toLocaleString('en-US', { hour12: false })),
                // updatedAt: (new Date().toLocaleString('en-US', { hour12: false })),
                is_verified: true

            },
            {
                where: {
                    activation_token: email_token
                },
            }
        );
        user
            ? res.status(HttpStatus.UPDATED.code).send(
                new Response(true, `USER ${CustomMessages.MESSAGE.accountVerifiedSuccessfully}`, user)
            )
            : res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(false, `USER ${HttpStatus.NOT_FOUND.message}`, user)
            );
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
            new Response(false, error.message)
        );
    }
};

const registerChild = async (req, res) => {

    try {
        const validationResult = await childRegistrationValidation.validateAsync(req.body);
        let { full_name, user_name, email, mobile_number } = validationResult;
        let user = req.user;

        console.log(req);
        const child = await User.create({
            parent_id: user.id,
            full_name,
            user_name,
            email,
            mobile_number,
            password: '123456',
            users_type: 'Student',
            is_verified: false,
        });

        res.status(HttpStatus.CREATED.code).send(
            new Response(true, `USER ${HttpStatus.CREATED.message}`, child));

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
        })
    }

};


const userLogin = async (req, res) => {
    try {
        const { email = "", password, mobile_number = "" } = req.body;

        if (email && password || mobile_number && password) {
            const user = await User.findOne({
                where: {
                    [Op.or]: [{ email }, { mobile_number }]
                },
                include: [UserProfile, 'children'],
            });

            if (user) {

                if (!user.is_verified) {
                    return res.status(HttpStatus.UNAUTHORIZED.code).send(
                        new Response(false, CustomMessages.MESSAGE.accountNotVerified)
                    )
                }
                // const { id, full_name, user_type } = user;
                const auth = await bcrypt.compare(password, user.password);
                if (auth) {
                    const token = createJWT(user.toJSON());

                    return res.status(HttpStatus.OK.code).send(
                        new Response(
                            true,
                            `USER ${CustomMessages.MESSAGE.loginSuccess}`,
                            { 'user': user, 'access_token': token }
                        )
                    )

                }

                return res.status(HttpStatus.UNAUTHORIZED.code).send(
                    new Response(false, `${CustomMessages.MESSAGE.inValid} PASSWORD`)
                )
            }
        } else {
            return res.status(HttpStatus.BAD_REQUEST.code).send(
                new Response(false, CustomMessages.MESSAGE.emailPasswordNotFound)
            );
        }

        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
            new Response(false, `USER ${HttpStatus.NOT_FOUND.message}`))
    }
    catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
            new Response(false, `${err}`))
    }
};

const loginWithOtp = async (req, res) => {
    const { mobile_number } = req.body;

    if (mobile_number) {
        const user = await User.findOne({
            where: {
                mobile_number: mobile_number,
            }
        });

        if (user) {
            if (!user.is_verified) {
                return res.status(HttpStatus.UNAUTHORIZED.code).send(
                    new Response(false, CustomMessages.MESSAGE.accountNotVerified)
                )
            }

            otp = helpers.sendOtp(mobile_number);
            if (otp) {
                user.login_otp = otp;
                await user.save();

                return res.status(HttpStatus.OK.code).send(
                    new Response(true, CustomMessages.MESSAGE.otpSentSuccessfully)
                );
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
                new Response(false, CustomMessages.MESSAGE.otpSendingFailed)
            );
        }
        return res.status(HttpStatus.NOT_FOUND.code).send(
            new Response(false, `MOBILE ${HttpStatus.NOT_FOUND.message}`)
        );
    }
    return res.status(HttpStatus.BAD_REQUEST.code).send(
        new Response(false, `${HttpStatus.BAD_REQUEST.message}`))
};

const userLoginOtp = async (req, res) => {
    const { mobile_number, otp } = req.body;

    if (mobile_number && otp) {
        const user = await User.findOne({
            where: {
                mobile_number: mobile_number
            },
            include: [UserProfile, 'children'],
            // include: 'children'
        });

        if (user) {
            if (!user.is_verified) {
                return res.status(HttpStatus.UNAUTHORIZED.code).send(
                    new Response(false, CustomMessages.MESSAGE.accountNotVerified)
                )
            }

            if (otp == user.login_otp) {
                const token = createJWT(user.toJSON());

                return res.status(HttpStatus.OK.code).send(
                    new Response(
                        true,
                        `USER ${CustomMessages.MESSAGE.loginSuccess}`,
                        { 'user': user, 'access_token': token }
                    )
                )
            }

            return res.status(HttpStatus.UNAUTHORIZED.code).send(
                new Response(false, `${CustomMessages.MESSAGE.inValid} OTP`)
            );
        }
    } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
            new Response(false, `MOBILE NUMBER ${HttpStatus.NOT_FOUND.message}`))
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
        new Response(false, `USER ${HttpStatus.NOT_FOUND.message}`))
};


const getAllUsers = async (req, res) => {
    try {
        const user = await User.findAll();
        user
            ? res.status(HttpStatus.OK.code).send(
                new Response(true, `USER ${HttpStatus.OK.message}`, user)
            )
            : res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(false, `USER ${HttpStatus.NOT_FOUND.message}`, user)
            )


    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
            new Response(false, error.errors[0].message)
        )
    }
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: {
                id,
            },
        });
        user
            ? res.status(HttpStatus.OK.code).send(
                new Response(true, `USER ${HttpStatus.OK.message}`, user)
            )
            : res.status(HttpStatus.NOT_FOUND.message).send(
                new Response(false, `USER ${HttpStatus.NOT_FOUND.message}`, user)
            );
    } catch (error) {
        res.status(HttpStatus.OK.code).send(
            new Response(false, `USER ${HttpStatus.NOT_FOUND.message}`)
        );
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = await User.destroy({
            where: {
                id,
            },
        });

        userId
            ? res.status(HttpStatus.DELETED.code).send(
                new Response(true, `USER ${HttpStatus.DELETED.message}`, userId)
            )
            : res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(false, `USER ${HttpStatus.NOT_FOUND.message}`, userId)
            );
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.error).send(
            new Response(false, error.message)
        );
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, email, password, mobile_number } = req.body;

        let hashPassword;
        if (password) {
            const salt = await bcrypt.genSalt();
            hashPassword = await bcrypt.hash(password, salt);
        }

        const [user] = await User.update(
            {
                full_name,
                email,
                mobile_number,
            },
            {
                where: {
                    id,
                },
            }
        );
        user
            ? res.status(HttpStatus.UPDATED.code).send(
                new Response(true, `USER ${HttpStatus.UPDATED.message}`, user)
            )
            : res.status(HttpStatus.NOT_FOUND.code).send(
                new Response(false, `USER ${HttpStatus.NOT_FOUND.message}`, id)
            );
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code).send(
            new Response(false, error.message)
        );
    }
};

module.exports = {
    signUpUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    userLogin,
    verifyEmail,
    registerChild,
    userLoginOtp,
    loginWithOtp
};
