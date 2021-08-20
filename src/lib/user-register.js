const redis = require('redis');

const db = redis.createClient();
const pub = require('../redis-server/connection');
const { v4: uuidv4 } = require('uuid');

// var redis = new Redis({
//     port:6379,
//   host: "127.0.0.1",
//   password: ""
// });


async function createUser(user){
    console.log(user);
    const json = JSON.parse(user);
    json.id = uuidv4();
    db.set(json.email,JSON.stringify(json),(err,msg)=>{
        if (err) pub.publish('There has been error while creating user '+err);
        else pub.publish('User has been added succesfully with id '+ json.id);
    });
}

async function getUser(email){
    var userFinded = '';
    db.get(email,(err,succ)=>{
        if (err) pub.publish('There has been error while creating user '+err);
       else {
           userFinded = succ;
           pub.publish('Requested User '+ succ)
        }
    });
    return Promise.resolve(userFinded);
}

module.exports={createUser,getUser}
