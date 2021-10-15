const express = require('express');
const router = express.Router();
const EmailModel = require("../models/TestEmailModel");

router.get('/', async(req, res)=>{
  const msg=new EmailModel({
    email:'12345eii@gmail.com'
  })
  try{
    await msg.save().then(doc=>{console.log(doc)})

  }catch(err){
    console.error(`ERROR on msg ${err}`)
  }
})

module.exports = router;