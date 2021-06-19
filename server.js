// import express
const express = require('express');
// instantiating express
const app =express();
// require dotevn
require('dotenv').config({path:"./config/.env"});
// port initialization
const port =process.env.PORT || 3000;
//require connectDB
const connectDB = require('./config/connectDB.js');
// connect to data base
connectDB();
// launch server
app.listen(port,(error)=>{
    error?console.log(error)
    :console.log(`the server is running on port ${port}`)
});