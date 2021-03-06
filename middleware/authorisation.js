const jwtGenerator = require("../utils/jwtGenerator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
	try {
		const jwtToken = req.header("token");

		if (!jwtToken) {
			
			return res.status(403).json("Not authorised 1");
		}
		const payload = jwt.verify(jwtToken, process.env.jwtSecret);
		req.user = payload.user;

		next();
	} catch (error) {
		console.log(error);
		return res.status(403).json("Not authorised 2");
	}
};
