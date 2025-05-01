const express = require('express')
app = express();// Initilized Express
require('dotenv').config();

require('./Models/db');// yaha db import kiya to db connect ho gaya

const PORT = process.env.PORT || 8000;

app.get('/ping',(req,res,next)=>{
res.send('On / ping we get pong')
})

app.listen(PORT, ()=>{
    console.log("Server is running ready to listen ",PORT);
})