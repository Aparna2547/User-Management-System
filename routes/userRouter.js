const express = require('express')
const userRoute = express();
const userController= require("../controllers/userController")
const session = require("express-session")
const nocache = require('nocache')

const config = require("../configuration/config")
userRoute.use(session({secret:config.sessionSecret}))

const auth = require('../middleware/auth')

userRoute.use(express.json())
userRoute.use(express.urlencoded({extended:true}))
userRoute.set('view engine','ejs')
userRoute.set('views','./views')


userRoute.get('/',auth.isLogout,userController.loadLogin)

userRoute.get('/register',auth.isLogout,userController.loadRegister)
userRoute.post('/register',userController.userRegister)
userRoute.post('/login',userController.userLogin)

userRoute.post('/dashboard',userController.dashBoard)
userRoute.get('/dashboard',auth.isLogin,userController.loadDash)


userRoute.get('/logout',userController.userLogout)





module.exports = userRoute;