const express = require('express');
const router = express.Router();
const jwt= require('jsonwebtoken')
const User = require("../models/User.js");
const {playlistSchema} = require("../models/songModel.js")

const secret = "musicdepot";
const refreshSecret = "topedcisum";


const verify = (req, res, next) => {
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

router.post('/getplaylist',verify, (req, res)=>{
  playlistSchema.findOne({ username: req.user.username},(err,playlist)=>{

    res.status(200).json(playlist)
  })
})

router.post('/addplaylist',verify,(req, res)=>{
  const newPlaylist=req.body.newPlaylist
  playlistSchema.findOne({ username: req.user.username }, async (err, playlist) => {

    // playlist.mySongList[`${Object.keys(newPlaylist)[0]}`] == req.body.newPlaylist[`${Object.keys(newPlaylist)[0]}`]
    playlist.mySongList['123'] == req.body.newPlaylist

    await playlist.save()
    res.status(200).json(playlist)
  })
})


module.exports = router;