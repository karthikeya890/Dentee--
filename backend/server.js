const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

require("dotenv").config();
const port = process.env.PORT;

const register = require("./src/routers/registerRoute");

const login = require("./src/routers/loginRoute");

app.use("/login", login);

app.use("/register", register);

app.get("/", (req, res) => {
  res.send({ meg: "welcome" });
});

app.listen(port, () => {
  console.log(`Sever Running on PORT:${port}`);
});
