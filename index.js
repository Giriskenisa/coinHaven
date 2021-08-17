const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();


mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true},
()=>console.log('connected'));


//Middleware
app
.use(express.json())
.use('/api/user',authRoute)
.use('/api/posts',postRoute);

app.listen(3000, () => console.log('Server up'));