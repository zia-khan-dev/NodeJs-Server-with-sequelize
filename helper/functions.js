const path = require('path')
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const express = require('express');
const emailTemplatesPath = path.resolve(__dirname, '../templates/emails/');
const emailTemplateParialsPath = path.resolve(__dirname, '../templates/emails/partials');
const { HttpStatus } = require("./statusCode");
const sendOtp = () => {
    // TODO: Need to integrate SMS gateway later
    let otp = 123456;
    return otp;

}

const sendEmail = async (mailOptions) => {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        // secure: true, 
        auth: {
            user: process.env.EMAIL_USER, // apikey
            pass: process.env.EMAIL_PASSWORD
        }
    });

    transporter.use('compile', hbs({
        viewEngine: {
            //extension name
            extName: '.html',
            // layout path declare
            layoutsDir: emailTemplatesPath,
            defaultLayout: false,
            //partials directory path
            partialsDir: emailTemplateParialsPath,
            express

        },
        //View path declare
        viewPath: emailTemplatesPath,
        extName: '.html',
    }));

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log('Error while sending email: ' + err);
        } else {
            console.log('Email sent successfully ' + data);
        }

    });
}

const validationHandler = (res, error) => {
    console.log(error);
    return res.status(HttpStatus.BAD_REQUEST.code).json({
        success: false,
        message: error
    })
}



module.exports = {
    sendOtp,
    sendEmail,
    validationHandler
};