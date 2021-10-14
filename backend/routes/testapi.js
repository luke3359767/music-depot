const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
  res.json({
    status:'api works',
    message:'welcome to use api'
  });
})

module.exports = router;