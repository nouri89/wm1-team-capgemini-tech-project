const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorisation = require("../middleware/authorisation");


router.post("/register", validInfo, async (req, res) => {
	
	try {
		//1.destructure  the request.body (name,email, password)
		const { name, email, password, role } = req.body;

		//2.check if the user exist (if user exist throw an error)
		const user = await pool.query("SELECT * FROM users WHERE email =$1", [
			email,
		]);

		if (user.rows.length !== 0) {
			
			return res.status(401).json("User already exist");
		}

		//3.bcypt the user password
		const saltRound = 10;
		const salt = await bcrypt.genSalt(saltRound);

		const bcryptPassword = await bcrypt.hash(password, salt);

		//4. enter the user in the database

		const newUser = await pool.query(
			"INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) returning *",
			[name, email, bcryptPassword, role]
		);

		//res.json(newUser.rows[0]);
		//5 . generate the jwt token

		const token = jwtGenerator(newUser.rows[0].id);
		res.json({ token });
	} catch (error) {
		console.log(error);
		res.status(500).json("Server Error ");
	}
});

//login route

router.post("/login", validInfo, async (req, res) => {
	try {
		//1. deconstructure the req.body
		const { email, password } = req.body;

		//2. check if the user doesn't exist , if no then throw an error
		const user = await pool.query("SELECT * FROM users WHERE email=$1", [
			email,
		]);

		if (user.rows.length === 0) {
			return res.status(401).json("Password or email incorrect");
		}

		//3 check if incoming password is the same as the database password

		const isValidPassword = await bcrypt.compare(
			password,
			user.rows[0].password
		);
	
		if (!isValidPassword) {
			return res.status(401).json("Password or email incorrect");
		}

		//4 give them gwt tocken

		const token = jwtGenerator(user.rows[0].id);
		res.json({ token });
	} catch (error) {
		console.log(error);
		res.status(500).json("Server Error");
	}
});
router.get("/is-verify", authorisation, async (req, res) => {
	
	try {
		res.json(true);
	} catch (error) {
		console.log(error);
		res.status(500).json("Server Error");
	}
});

module.exports = router;
