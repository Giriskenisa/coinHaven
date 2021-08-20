const express = require('express');
const app = require('express')();
var conn = require('./redis-server/connection');
var register = require('./lib/user-register');

app.use(express.json())
.use(express.raw());

app.post('/register',(req,res,next)=>{
    try{
        register.createUser(JSON.stringify(req.body));
        res.sendStatus(200);
        res.end();
    }catch(err) {
      res.end();
    }
    
}
);

app.get('/:email',(req,res,next)=>{
    try{
        const a = register.getUser(req.params.email);
        res.sendStatus(200).json({'user':a});
    }catch(err) {
      res.end();
    }
    
}
);

app.listen(4000,()=>{
    console.log('listening');
})