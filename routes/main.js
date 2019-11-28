const express = require("express");
const router = express.Router();
const hbs = require("nodemailer-express-handlebars");
require("dotenv").config();
const fromMAil = process.env.MAIL;

//route to handle the form data

//Insertion
router.post("/form",(req,res)=>{
   var date = new Date(Date.now());
    date = date.getDate()+"-"+parseInt(date.getMonth()+1)+"-"+date.getFullYear()+","+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
   const model = require("../models/visitorEntryModel");
   const data = {
       visitorName:req.body.visitor,
       hostName:req.body.hostName,
       hostMobile:req.body.hmobile,
       hostEmail:req.body.hemail,
       visitorEmail:req.body.email,
       visitorMobile:req.body.mobile,
       purpose:req.body.purpose,
       entered:date,
   }
   const newEntry = new model(data);
   newEntry.save((err)=>{
       if(!err){
           const transport = require("../sendMail/mailConfig");
           transport.use("compile",hbs({
               viewEngine:{
                   partialsDir:"./sendMail/templates",
                   defaultLayout:""
               },
               viewPath:"./sendMail/templates",
               extName:".hbs"
           }));
           const mailOptions = {
               from:fromMAil,
               to:req.body.hemail,
               subject:"Visitor Info",
               template:"entry",
               context:{
                   host:req.body.hostName,
                   visitor:req.body.visitor,
                   mail:req.body.email,
                   mobile:req.body.mobile
               }
           }
           transport.sendMail(mailOptions,(e)=>{
               if(e){
                   console.log(e)
               }else{
                   console.log("sent");
               }
           });
           res.send("Data Inserted");
       }
       else{
        res.send("Data not Inserted");
       }
      
   });    
});

//Fetching
router.post("/getvisitors",(req,res)=>{
    const model = require("../models/visitorEntryModel");
    model.find({}).then(resp=>{
        res.send(resp); 
    }).catch(err=>{
        console.log("Error occured in gerring data")
    });
    
});

//Deletion
router.post("/delete/:id",(req,res)=>{
    const id =req.params.id;
    const model = require("../models/visitorEntryModel");
    model.find({entered:id}).then(resp=>{
        const mail = resp[0]['visitorEmail'];
        const name = resp[0]['visitorName'];
        const host = resp[0]['hostName'];
        const mobile = resp[0]['visitorMobile'];
        var checkIn = resp[0]['entered'];
        checkIn = checkIn.split(",");
        checkIn = checkIn[1];
        checkIn = checkIn.split(":");
        if(parseInt(checkIn[0])>12){
            checkIn[0] = checkIn[0]-12;
            checkIn = checkIn.join(":")+" PM";
        }else{
            checkIn = checkIn.join(":")+" AM";
        }
        var checkOut = new Date(Date.now());
        var hrs = parseInt(checkOut.getHours());
        if(hrs>12){
            hrs=hrs-12; 
            checkOut = hrs+":"+checkOut.getMinutes()+":"+checkOut.getSeconds()+" PM";
        }else{
            checkOut = hrs+":"+checkOut.getMinutes()+":"+checkOut.getSeconds()+" AM";
        }
        //Send Mail to Visitor
        const transport = require("../sendMail/mailConfig");
        transport.use("compile",hbs({
            viewEngine:{
                partialsDir:"./sendMail/templates",
                defaultLayout:""
            },
            viewPath:"./sendMail/templates",
            extName:".hbs"
        }));
        const mailOptions = {
            from:fromMAil,
            to:mail,
            subject:"Your Visit",
            template:"leaving",
            context:{
                visitor:name,
                host:host,
                mobile:mobile,
                mail:mail,
                address:"Noida, Innovacer",
                cTime:checkIn,
                oTime:checkOut,
            }
        }
        transport.sendMail(mailOptions,(e)=>{
            if(e){
                console.log(e)
            }else{
                
                console.log("sent to Visitor");
            }
        });
    }).catch(err=>{
        console.log(err);
    })
    model.deleteOne({entered:id}).then(()=>{
        console.log("removed");
        res.send("removed");
    }).catch(err=>{
        console.log(err);
        res.send("not removed");
    });

    
});

module.exports = router;
