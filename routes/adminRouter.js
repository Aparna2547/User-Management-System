const express = require('express');
const adminRoute = express();
const nocache = require('nocache')
const session =  require('express-session')


const adminauth = require('../middleware/adminauth')

adminRoute.use(express.json())
adminRoute.use(express.urlencoded({extended:true}));

adminRoute.set('view engine','ejs')
adminRoute.set('views','./views/admin')



const adminController = require('../controllers/adminController')

adminRoute.get('/',adminauth.isadminLogout,adminController.adminLogin)




//home
adminRoute.post('/home',adminController.verifyLogin)
adminRoute.get('/home',adminController.loadHome)


//add new user
adminRoute.get('/newUser',adminauth.isadminLogin,adminController.newUserLoad)
adminRoute.post('/newUser',adminController.addUser)


//edit User
adminRoute.get('/editUser',adminauth.isadminLogin,adminController.editUserLoad)
adminRoute.post('/editUser',adminController.editUser)

//delete User
adminRoute.get('/deleteUser',adminController.deleteUserLoad)



//logout
adminRoute.get('/adminlogout',adminController.adminLogout)





//for only admin login
adminRoute.get('*',(req,res)=>
{
    res.redirect('/admin')
})
module.exports = adminRoute