const mongoose = require("mongoose");

const song = new mongoose.Schema({
  _id: String ,
  name: String,
  artist: String,
  album: String,
  path: String,
  length: String,
});

const playlist = new mongoose.Schema({
  userID: {type:String, unique: true},
  favorite: {
    songs: [String],
  },
  recently: {
    songs: [String],
  },
  mySongList: {
    songList: {
      name: String,
      album: { type: String, default: "sampleAlbum.jpg" },
      songs: [String],
    },
  },
});

const songSchema  = mongoose.model("songSchema", song);
const playlistSchema = mongoose.model("playlistSchema", playlist );
module.exports = { songSchema: songSchema, playlistSchema: playlistSchema }

// PlaylilstList:{
//   name:"favorite",
//   album:"favorite.jpg",
//   songs:[1111,2222,3333,songID],
// }
// songsList:{
//   {
//       id:"songid",
//       name:"Attention",
//       artist:"Artist",
//       album:"Attention.jpg",
//       path:"../../audio....",
//       length:"3:31",
//   },

//   {
//     id:"songid",
//     name:"Attention",
//     artist:"Artist",
//     album:"Attention.jpg",
//     path:"../../audio....",
//     length:"3:31",
//   },
// }
// AllSongList: {
//   {userID:"userID",
//     favorite:songsList,
//     recently:songsList,
//     mysonlist:{
//       list{
//         name: "testList",
//         album: "something.jpg",
//         songs:[1111,2222,3333...]
//       }
// },
//   },
// }