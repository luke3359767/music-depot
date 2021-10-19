const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

router.post('/register',(req, res)=>{
    const registerInfo=req.body.registerInfo
    const newUser= new User(registerInfo)
    newUser.setPassword(req.body.registerInfo.password);
    try{
        newUser.save((err)=>{
          res.status(404).json(`Error! ${err}`)
        }).then(res.status(200).json("Created user successfully"));
    }catch{
            console.error(`ERROR on ${err}`);
    }
})

module.exports = router