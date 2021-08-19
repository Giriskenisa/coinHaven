const Redis = require('ioredis');
const redis = new Redis();
const pub = new Redis();

const channel = 'registerChannel';

redis.on('message', (channel, message) => {
    console.log(`${message} \n`);
});


redis.subscribe(channel, (error, count) => {
    if (error) {
        throw new Error(error);
    }
    console.log(`Subscribed to ${channel}. Listening for updates on the ${channel} channel.\n`);
});

function publish (user) {
    pub.publish(channel, user);
}
module.exports = {
    publish
}


    
    



