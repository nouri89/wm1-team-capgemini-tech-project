const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(id) {
	const payload = {
		user: id,
	};

	console.log(payload);

	return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "3h" });
	//endcode
}

module.exports = jwtGenerator;
