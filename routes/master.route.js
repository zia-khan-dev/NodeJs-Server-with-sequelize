const interest_controller = require("../controllers/master/interest.controller");
const express = require("express");
const { requireAuth } = require("../middlewares/auth.middleware");

const interestRouter = express.Router();

interestRouter.route("/search")
        .get(requireAuth, interest_controller.search);


module.exports = { interestRouter };