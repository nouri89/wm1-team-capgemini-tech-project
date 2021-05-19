const router = require("express").Router();
const pool = require("../db");
const authorisation = require("../middleware/authorisation");

router.get("/", authorisation, async (req, res) => {
	try {
		//req.user has the payload
	
		//res.json(req.user);

		const user = await pool.query("SELECT name FROM users WHERE id =$1", [
			req.user,
		]);

		res.json(user.rows);
	} catch (error) {
		console.log(error);
		res.status(500).send("server error");
	}
});

module.exports = router;
