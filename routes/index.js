const express = require('express');
const router = express.Router();
const axios = require('axios');


router.all('/user/*', (req,res) => {
     axios.get('http://localhost:3001'.concat(req.path.replace('/user',''))).then((response)=>{
         res.send(response.data);
     })
})

module.exports = router;