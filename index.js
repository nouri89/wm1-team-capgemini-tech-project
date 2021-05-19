//require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());
//process.env.NODE_ENV

if (process.env.NODE_ENV == "production") {
 //   app.use(express.static(path.join(__dirname,"client/build")))
}
	// register and login route

	app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

const PORT = process.env.PORT || 3021;

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
