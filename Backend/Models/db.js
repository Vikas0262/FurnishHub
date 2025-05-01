// get a db connection

const mongoose = require('mongoose')

const mongoo_url =  process.env.MONGOO_URI; // agar server dotenv import kiye to yaha jarurat nahi hai

mongoose.connect(mongoo_url)// It will take mongoo url and return promise
.then(()=>{
    console.log("DB is connected Successfully..")
}).catch((error)=>{
    console.log("Some error occured while db connection " ,error);
})