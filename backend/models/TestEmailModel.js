const mongoose = require('mongoose');
const validator= require('validator');

let emailSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:(value)=>{return validator.isEmail(value)}
    },
    _id: String,
})

module.exports =mongoose.model('Email',emailSchema);