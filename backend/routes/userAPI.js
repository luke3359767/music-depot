const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const passwordValidator = require("password-validator");

router.post("/register", (req, res) => {
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
  if (!passValidate.validate(req.body.registerInfo.password)) {
    return res
      .status(403)
      .json({
        passwordValidateErr: passValidate.validate(
          req.body.registerInfo.password,
          { list: true }
        ),
      });
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



router.post("/login", (req, res) => {
   User.findOne({ username: req.body.username }, function (err, user) {
     if (!user) {
         res.status(404).json("Invalid username or password(user)");
     } else {
       if (user.validPassword(req.body.password)) {
        //   const accessToken = user.generateJWT();  //send to cookie
        //   const refreshToken = user.generateRefreshJWT();  //send to memory
         return res.status(200).json(user.toAuthJSON());
       } else {
         res.status(404).json("Invalid username or password");
       }
     }
   });
});

const secret = "musicdepot";
const refreshSecret = "topedcisum";

const verify=(req, res,next)=>{
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }

      req.user = user;
      console.log("this is the user: ", user);
      next();
    });
  } else {
    res.status(401).json("not auth");
  } 
}

module.exports = router;
