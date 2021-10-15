const mongoose = require("mongoose");

const playlistModel = new mongoose.Schema({
  list:{
    name:String,
    album:String,
    songs:Array,

  
  } 
});


// SongList:{
//   name:"favorite",
//   album:"favorite.jpg",
//   songs:[{
//     id:"a id",
//     name:"Attention",
//     artist:"Artist",
//     album:"Attention.jpg",
//     path:"../../audio....",
//     length:"3:31",
//   },{},{}],
// }