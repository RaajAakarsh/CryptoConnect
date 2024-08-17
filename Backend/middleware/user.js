const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
	const words = token.split(" ");
	const jwtToken = words[1];
	jwt.verify(jwtToken, JWT_SECRET);
	if (decodedValue.username) {
		next();
	} else {
		res.status(403).json({
			message: "You are not authenticated",
		});
	}
}

module.exports = userMiddleware;
