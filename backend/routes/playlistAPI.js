const express = require('express');
const router = express.Router();
const User = require("../models/User.js");
const jwt= require('jsonwebtoken')
const User = require("../models/User.js");


router.get('/', (req, res)=>{
  res.json({
    status:'api works',
    message:'welcome to use api'
  });
})

module.exports = router;