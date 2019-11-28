//Database connection
const mongoose = require("../config");

//Schema
const schema = mongoose.Schema;

const dataSchema = new schema({
    visitorName:String,
    hostName:String,
    hostMobile:String,
    hostEmail:String,
    visitorEmail:String,
    visitorMobile:String,
    purpose:String,
    entered:String,
});

//model
const entries = mongoose.model("visitors",dataSchema);

module.exports = entries;