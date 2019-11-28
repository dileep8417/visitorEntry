//create connection for database (MongoDB)
const mongoose = require("mongoose");
require("dotenv").config();

const user = process.env.DBUSER || "tmp-user";
const pass = process.env.DBPASS || "enjoy";
const cluster = process.env.DBCLUSTER || "cluster0-sel8i";

mongouri = `mongodb+srv://${user}:${pass}@${cluster}.mongodb.net/test?retryWrites=true&w=majority`;

//connect
mongoose.connect(mongouri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
//check
mongoose.connection.on("connected",()=>console.log("Database Connected...!"));

module.exports = mongoose;