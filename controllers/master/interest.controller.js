const Interest = require("../../models/master/Interest.model");
const { HttpStatus } = require("../../helper/statusCode");
const Response = require("../../helper/response");
const { Op } = require("sequelize");



const search = async (req, res) => {
    try {
        const searched_titles = req.query.q;
        console.log(req);

        const interest_detail = await Interest.findAll({
            where: {
                interest_title: {
                    [Op.like]: `%${searched_titles}%`
                }
            },

        });

        interest_detail
            ? res.status(HttpStatus.OK.code).send(
                new Response(true, `INTERESTS ${HttpStatus.OK.message}`, interest_detail)
            )
            : res.status(HttpStatus.NOT_FOUND.message).send(
                new Response(false, `INTERESTS ${HttpStatus.NOT_FOUND.message}`, interest_detail)
            );
    } catch (error) {
        res.status(HttpStatus.OK.code).send(
            new Response(false, `INTERESTS ${HttpStatus.NOT_FOUND.message}`)
        );
    }
};





module.exports = {
    search


};