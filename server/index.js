//require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// register and login route


app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

const PORT = process.env.PORT || 3021;

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
