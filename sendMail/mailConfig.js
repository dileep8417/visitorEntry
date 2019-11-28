const nodeMailer = require("nodemailer");
require("dotenv").config();
const fromMail = process.env.MAIL;
const pass = process.env.MAILPASS
//create transport
const transport = nodeMailer.createTransport({
    service:"gmail",
    auth:{
        user:fromMail,
        pass:pass
    }
});


module.exports = transport;
