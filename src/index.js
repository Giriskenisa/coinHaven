const express = require('express');
const app = require('express')();
var conn = require('./redis-server/connection');


app.use(express.json())
.use(express.raw());

app.post('/',(req,res,next)=>{
    try{
        var response = conn.publish(JSON.stringify(req.body));
        res.end();
    }catch(err) {
      console.log(err.message)
      res.end();
    }
    
}
);

app.listen(4000,()=>{
    console.log('listening');
})