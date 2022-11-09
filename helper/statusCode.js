const HttpStatus = {
    OK: { code: 200, msg: "FETCH SUCCESSFULLY" },
    NOT_FOUND: { code: 200, msg: "NOT FOUND" },
    DELETED: { code: 204, msg: "DELETED" },
    CREATED: { code: 201, msg: "CREATED" },
    UNAUTHORIZED: { code: 401, msg: "UNAUTHORIZED" },
    BAD_REQUEST: { code: 400, msg: "BAD_REQUEST" },
    ROUTE_NOT_FOUND: { code: 404, msg: "NOT_FOUND" },
    INTERNAL_SERVER_ERROR: { code: 500, msg: "INTERNAL_SERVER_ERROR" },
    FILE_UPLOAD_ERROR: { code: 500, msg: "FILE_UPLOAD_ERROR" },
};

module.exports = HttpStatus;