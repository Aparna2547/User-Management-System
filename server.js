const mongoose = require('mongoose')
const express = require('express')
const path =require('path')
const session =require('express-session')
const nocache = require('nocache')
const crypto = require('crypto')

const app=express()


const dbConnect =()=>{
    try{
        mongoose.connect("mongodb://127.0.0.1:27017/usermanagement")
        console.log("connected to db");
    }
    catch(error){
        console.log(error.message);
    }
}
dbConnect()

app.use(nocache())

//for user routes
const userRoute= require('./routes/userRouter')
app.use('/',userRoute)

//for admin routes
const adminRoute = require('./routes/adminRouter')
app.use('/admin',adminRoute)


//for  public
app.use(express.static(path.join(__dirname,'public')))






//create secret key for session middleware
const secretKey= crypto.randomBytes(32).toString('hex')

//session middlewares
app.use(session({
    secret:'secretKey',   
     resave:false,
    saveUninitialized:true
}))

app.listen(2000,()=>{
    console.log("server is running");
})