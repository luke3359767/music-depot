const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const passwordValidator = require("password-validator");

router.post('/register',(req, res) => {
  const registerInfo = req.body.registerInfo;
  const passValidate = new passwordValidator();
  passValidate
    .is()
    .min(6) // Minimum length 8
    .is()
    .max(20) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .symbols()
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Blacklist these values
  if(!passValidate.validate(req.body.registerInfo.password)){
    res.status(403).json({passwordValidateErr:passValidate.validate(req.body.registerInfo.password,{list:true})});
    res.end()
  }
  
    const newUser = new User(registerInfo);
  newUser.setPassword(req.body.registerInfo.password);
  try {
    newUser.save((err, user) => {
      if (err) {
        res.status(403).json({
          emailErr: err.errors.email?.message || null,
          userErr: err.errors.username?.message || null,
        });
      } else {
        res.status(200).json("Created user successfully");
      }
    });
  } catch (err) {
    console.error(`ERROR on ${err}`);
  }
});

module.exports = router