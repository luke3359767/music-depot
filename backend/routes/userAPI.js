const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

router.post('/register',(req, res)=>{
    const registerInfo=req.body.registerInfo
    const newUser= new User(registerInfo)
    newUser.setPassword(req.body.registerInfo.password);
    try{
        newUser.save((err,user)=>{
          if(err){
            res.status(403).json({
              emailErr: err.errors.email.message || null,
              userErr: err.errors.username.message || null,
            });
          }else{
            res.status(200).json("Created user successfully");
          }
        })
    }catch(err){
            console.error(`ERROR on ${err}`);
    }
})

module.exports = router