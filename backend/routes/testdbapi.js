const express = require('express');
const router = express.Router();
const EmailModel = require("../models/TestEmailModel");

router.post('/insert', (req, res)=>{

  const emailState=req.body.email

  const msg = new EmailModel({
    email: emailState
  });
  try{
    msg.save().then(doc=>{console.log(doc)})

  }catch(err){
    console.error(`ERROR on msg ${err}`)
  }
})

router.get('/read', (req, res)=>{
  EmailModel.find({},(err,result)=>{
    if(err){res.send(err)}
    res.send(result)
  })

})

router.put('/update',(req,res)=>{
  const newemail = req.body.newemail;
  const id=req.body.id;


  try{
    EmailModel.findById(id,(updateemail)=>{
      // console.log(id);
      // console.log(updateemail)
      // updateemail.email=newemail
      // updateemail.save()
    })
  }catch{
     console.error(`ERROR on update ${err}`);
  }
})

module.exports = router;