const { array } = require("joi");
const multer = require("multer");
const HttpStatus = require("../helper/statusCode");
// const {userPostValidator} = require("../validators/post.validators")
const validatePost = require("./validatePost.middleware");
const validateStory = require("./validateStory.middleware");
const uuid = require("uuid").v4;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadLocation = `uploads${req.baseUrl}`;
        console.log("file", file);
        if (
            !file.mimetype.includes("image") &&
            !file.mimetype.includes("video")
        ) {
            return cb(new Error("File format doesn't supported"));
        }
        cb(null, uploadLocation);
    },
    filename: function (req, file, cb) {
        const { originalname } = file;
        const fileName = `${uuid()}-${originalname}`;
        console.log("size", process.env.POSTMEDIASIZE);
        cb(null, fileName);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: process.env.POSTMEDIASIZE,
    },
}).array("media");

const fileUpload = (req, res, next) => {
    upload(req, res, (err) => {
        let validated;
        req.baseUrl == "/post"
            ? (validated = validatePost(req, res))
            : (validated = validateStory(req, res));

        if (validated) {
            if (err instanceof multer.MulterError) {
                res.status(HttpStatus.FILE_UPLOAD_ERROR.code).send({
                    success: false,
                    msg: err.message,
                });
            } else if (err) {
                return res.status(HttpStatus.FILE_UPLOAD_ERROR.code).send({
                    success: false,
                    msg: err.message,
                });
            }
            next();
        }
    });
};

module.exports = fileUpload;
