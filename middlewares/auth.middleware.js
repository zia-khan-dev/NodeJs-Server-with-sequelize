const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.SECRETKEY, (err, decodedToken) => {
            if (err) {
                console.log("token err", err.message);
                res.clearCookie("token");
                res.status(400).json(err.message);
            } else {
                next();
            }
        });
    } else {
        res.status(401).json("Authentication failed");
    }
};

module.exports = { requireAuth };
