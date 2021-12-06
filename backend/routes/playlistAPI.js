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
  const playlistName = req.body.playlistName
  playlistSchema.findOne({ username: req.user.username },(err, playlist) => {
    playlist.mySongList[playlistName] = {
      album: "sampleAlbum.jpg",
      songs: [],
    }
    playlist.markModified('mySongList')
    playlist.save()
    res.status(200).json("Your playlist was created successfully")
  
  })
})
router.post('/deletePlaylist', verify, (req, res) => {
  const playlistName = req.body.playlistName
  playlistSchema.findOne({ username: req.user.username }, (err, playlist) => {
    delete playlist.mySongList[playlistName] 
    playlist.markModified('mySongList')
    playlist.save()
    res.status(200).json(playlist)

  })
})


module.exports = router;