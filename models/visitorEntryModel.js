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
    exited:{
        default:0,
        type:Number
    },
    leaved:{
        type:String,
        default:"Not Leaved"
    }
});

//model
const entries = mongoose.model("visitors",dataSchema);

module.exports = entries;