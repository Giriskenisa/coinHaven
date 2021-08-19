const redis = require('redis');

const db = redis.createClient();
const pub = require('../redis-server/connection');
const { v4: uuidv4 } = require('uuid');


function createUser(user){
    console.log(user);
    const json = JSON.parse(user);
    json.id = uuidv4();
    db.set(json.id,JSON.stringify(json),(err,msg)=>{
        if (err) pub.publish('There has been error while creating user '+err);
        else pub.publish('User has been added succesfully with id '+ json.id);
    });
}

function getUser(id){
    var userFinded = '';
    db.get(id,(err,succ)=>{
        if (err) pub.publish('There has been error while creating user '+err);
       else {
           userFinded = succ;
           pub.publish('Requested User '+ succ)
        }
    });
    return userFinded;
}

module.exports={createUser,getUser}
