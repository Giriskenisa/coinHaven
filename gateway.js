const express = require('express');
const routes = require('./routes/index')
const app = express();
const PORT=8080;

app.use(express.json())
.use('/',routes);

app.listen(PORT,()=>{
    console.log('server running at %s',PORT);
})