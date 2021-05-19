//const jwtGenerator = require("../utils/jwtGenerator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
	try {
		console.log("got here auth");
		const jwtToken = req.header("token");
		if (!jwtToken) {
				console.log("not authorised");
			return res.status(403).json("Not authorised");
		}
		const payload = jwt.verify(jwtToken, process.env.jwtSecret);

		req.user = payload.user;
		console.log(req.user);
		next();
	} catch (error) {
		console.log(error);
		return res.status(403).json("Not authorised");
	}
};
