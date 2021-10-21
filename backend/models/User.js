const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = "musicdepot";
const refreshSecret = "topedcisum";

// https://thinkster.io/tutorials/node-json-api/creating-the-user-model

let UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Email can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
      unique: true,
    },
    bio: String,
    image: String,
    hash: String,
    salt: String,
  },
  { timestamps: true, collection: "users" }
);

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
     let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
     return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
      return jwt.sign(
        {
          id: this._id,
          username: this.username,
        },
        secret,
        { expiresIn: "15m" }
      );
    };
UserSchema.methods.generateRefreshJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
    },
    refreshSecret,
    { expiresIn: "30d" }
  );
};

    UserSchema.methods.toAuthJSON = function(){
          return {
            username: this.username,
            email: this.email,
            token: this.generateJWT(),
            refreshToken:this.generateRefreshJWT(),
            bio: this.bio,
            image: this.image
          };
        };

UserSchema.plugin(uniqueValidator,{message: 'Error, {PATH} has been used.'});

module.exports = User =mongoose.model('User',UserSchema);