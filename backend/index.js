const express = require("express");
const compression = require("compression");
const cors = require("cors");
const app = express();

// app.use(compression());
app.use(cors());
app.use(express.json());

require("dotenv").config();
const port = process.env.PORT;

const register = require("./src/routers/registerRoute");

const login = require("./src/routers/loginRoute");

const employees = require("./src/routers/employeeRoute");

const clinics = require("./src/routers/clinicsRoute");

app.use("/login", login);

app.use("/register", register);

app.use("/employees", employees);

app.use("/clinics", clinics);

app.get("/", (req, res) => {
  res.send({ meg: "welcome" });
});

app.listen(port, () => {
  console.log(`Sever is Running }`);
});
