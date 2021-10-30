const express = require('express');
const router = express.Router();
const jwt= require('jsonwebtoken')
const User = require("../models/User.js");

const secret = "musicdepot";
const refreshSecret = "topedcisum";
<<<<<<< HEAD

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(401).json("Token is not valid");
      }

=======

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(401).json("Token is not valid");
      }

>>>>>>> 87cc23600d11e3dd3e39c925bdb183deee565322
      req.user = user;
      console.log("this is the user: ", user);
      next();
    });
  } else {
    res.status(401).json("not auth");
  }
}

router.post('/getplaylist',verify, (req, res)=>{
  console.log(req.user)
})


module.exports = router;