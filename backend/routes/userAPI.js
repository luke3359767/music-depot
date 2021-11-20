const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { playlistSchema } = require("../models/songModel.js")
const passwordValidator = require("password-validator");
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

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
      .status(405)
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
  const defaultdata = {
    username: req.body.registerInfo.username,
    library: {
      favorite: {
        album: "favorite.png",
        songs: [],
      },
      recently: {
        album: "sampleAlbum.jpg",
        songs: [],
      },
    },
    mySongList: {
      myPlaylist: {
        album: "sampleAlbum.jpg",
        songs: [],
      },

    },
  }
  const newUserPlaylist = new playlistSchema(defaultdata);
  try {
    newUserPlaylist.save((err, user) => {
      if (err) {
        res.status(402).json(err.errors.message);
      } else {
        res.status(200).json("Created initial list successfully");
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
         res.status(200).cookie('refreshToken', user.generateRefreshJWT(), {
           expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * req.body.expiredDay ),
           secure: false, // set to true if your using https
           httpOnly: true,
           SameSite: "strict",
         }).json(user.toAuthJSON());
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
        return res.status(401).json("Token is not valid");
      }

      req.user = user;
      console.log("this is the user: ", user);
      next();
    });
  } else {
    res.status(401).json("not auth");
  } 
}

const generateRefreshJWT =(user)=>{
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    refreshSecret,
    { expiresIn: "30d" }
  )};
const generateJWT = function (user) {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    secret,
    { expiresIn: "15m" }
  );
};

router.post("/refresh", (req, res) => {
  //take the refresh token from user
  const refreshToken = req.cookies['refreshToken']
  //send error if there is no tocken or its invalid
  if (!refreshToken) return res.status(401).json("You are not auth !!!")

  jwt.verify(refreshToken, refreshSecret, (err, user) => {
    err && console.log(err);
    const newAccessToken = generateJWT(user)
    res.status(200).json({newAccessToken:newAccessToken})
  })});

  
router.post("/autologin", (req, res) => {
  //take the refresh token from user
  const refreshToken = req.cookies['refreshToken']
  if (!refreshToken) return res.status(401).json("You are not auth !!!")
  try{
    jwt.verify(refreshToken, refreshSecret, (err, user) => {
      err && console.log(err);  
      User.findOne({ username:user.username}, function (err, us) {
  
        res.status(200).json(us.toAuthJSON()); 
      })
    })  
  }catch(e){
    res.clearCookie("refreshToken").json("not valid auth token",e)

  }
  });

router.post("/testToken",verify, (req, res)=>{
  res.status(200).json("success test token");
})

router.post("/logout", verify, (req, res)=>{
  try{
    res.status(202).clearCookie("refreshToken").json("logout successfully");
  }catch(err){
    res.status(404).json(err);
  }
})

module.exports = router;
