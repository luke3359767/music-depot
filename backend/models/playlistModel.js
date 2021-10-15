const mongoose = require("mongoose");

const playlistModel = new mongoose.Schema({
  library: {
    favorite: {
      type: mongoose.SchemaTypes.Mixed,
    },
    recently: {
      type: mongoose.SchemaTypes.Mixed,
    },
  },
  playlist: {
    type: mongoose.SchemaTypes.Mixed,
  },
});