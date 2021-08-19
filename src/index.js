const express = require('express');
const app = require('express')();
var conn = require('./redis-server/connection');
var register = require('./lib/user-register');

app.use(express.json())
.use(express.raw());

app.post('/',(req,res,next)=>{
    try{
        register.createUser(JSON.stringify(req.body));
        res.end();
    }catch(err) {
      console.log(err.message)
      res.end();
    }
    
}
);

app.get('/:id',(req,res,next)=>{
    try{
        const a = register.getUser(req.params.id);
        res.end(a);
    }catch(err) {
      console.log(err.message)
      res.end();
    }
    
}
);

app.listen(4000,()=>{
    console.log('listening');
})