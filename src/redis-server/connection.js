const Redis = require('ioredis');
const redis = new Redis();
const pub = new Redis();

const channel = 'registerChannel';

redis.on('message', (channel, message) => {
    console.log(`User body has been received from post request ${channel}: ${message}`);
});


redis.subscribe(channel, (error, count) => {
    if (error) {
        throw new Error(error);
    }
    console.log(`Subscribed to ${channel}. Listening for updates on the ${channel} channel.`);
});

function publish (user) {
    pub.publish(channel, user);
}
module.exports = {
    publish
}


    
    



