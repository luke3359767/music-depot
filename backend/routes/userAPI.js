const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

router.post('/register',(req, res)=>{
    const registerInfo=req.body.registerInfo
    // const newUser= new User(registerInfo)
    const newUser= new User({
        username:"luke3359767",
        email:"3359767@gmail.com",
        bio:null,
        image:"null",
        hash:"",
        salt:""
    });
    try{
        newUser.save().then(doc=>{cnosole.log(doc)})
    }catch{
            console.error(`ERROR on ${err}`);
    }
})

module.exports = router;