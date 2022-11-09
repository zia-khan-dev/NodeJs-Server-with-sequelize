const { array } = require("joi");
const multer = require("multer");
const HttpStatus = require("../helper/statusCode");
const validatePost = require("./validatePost.middleware");
const validateStory = require("./validateStory.middleware");
const uuid = require("uuid").v4;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadLocation = `uploads${req.baseUrl}`;
        console.log("dfsd", uploadLocation);

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
                    msg: "An error occured during file uploading",
                });
            } else {
                const filterFile = req.files.filter(
                    (file) =>
                        file.mimetype.split("/")[0] != "image" &&
                        file.mimetype.split("/")[0] != "video"
                );

                if (filterFile.length != 0) {
                    return res.status(HttpStatus.FILE_UPLOAD_ERROR.code).send({
                        success: false,
                        msg: "File format doesn't supported",
                    });
                }
                next();
            }
        }
    });
};

module.exports = fileUpload;
