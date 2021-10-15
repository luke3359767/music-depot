const mongoose = require("mongoose");

const playlistModel = new mongoose.Schema({
  list:{
    name:String,
    album:String,
    songs:Array,

  
  } 
});


// PlaylilstList:{
//   name:"favorite",
//   album:"favorite.jpg",
//   songs:[1111,2222,3333,songID],
// }
songsList:{
  {
      id:"songid",
      name:"Attention",
      artist:"Artist",
      album:"Attention.jpg",
      path:"../../audio....",
      length:"3:31",
  },

  {
    id:"songid",
    name:"Attention",
    artist:"Artist",
    album:"Attention.jpg",
    path:"../../audio....",
    length:"3:31",
  },
}
AllSongList: {
  {userID:"userID",
    favorite:songsList,
    recently:songsList,
    mysonlist:songList,
  },
}