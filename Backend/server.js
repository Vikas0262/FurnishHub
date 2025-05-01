const express = require('express')
app = express();// Initilized Express
require('dotenv').config();

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log("Server is running ready to listen ",PORT);
})