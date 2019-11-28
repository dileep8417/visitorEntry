//modules 
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const routes = require("./routes/main");

//Middle-wares
app.use(cors());
app.use(morgan("tiny"));
app.use("/",routes);

//Creating Server
app.listen(PORT,()=>console.log("Server Started...!"));