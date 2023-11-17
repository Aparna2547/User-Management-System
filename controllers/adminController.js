const { Long } = require("mongodb")
const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const { name } = require("ejs")

exports.adminLogin = async (req,res)=>{
    try {
        res.render('loginadmin')
    } catch (error) {
        console.log(error.message);
        
    }
}



//home
exports.loadHome = async (req,res)=>{
    try {
        //for warning message
        var context = req.app.locals.specialContext;
        req.app.locals.specialContext = null;

        //search in the home
        const search= req.query.search || ""

        //for seeing user data in home
        const userData = await User.find({is_admin:0,
            $or:[{name:{$regex:'^'+search,$options:"i"}},
        {email:{$regex:'^'+search,$options:"i"}}]})
        res.render('home',{users:userData,context})
    } catch (error) {
        console.log(error.message);
    }
}

//load home page
exports.verifyLogin = async(req,res) =>{
    try {
        const email =req.body.email;
        const password = req.body.password;
        console.log(email,password);

        const adminFound = await User.findOne({email})
        console.log(adminFound);

        if(adminFound){

            const passwordMatch =await bcrypt.compare(password,adminFound.password)

            //if password is correct
            if(passwordMatch && adminFound.is_admin === 1){
                
                //session
                req.session.adminId = adminFound._id
                res.redirect('/admin/home')
            }else{
                res.redirect('/admin')
                console.log("in login2 page");
            }
        }else{
            res.redirect('/admin')
            console.log("in login3 page");
        }
    } catch (error) {
        console.log(error.message);
    }
}



//adds new user

exports.newUserLoad = async(req,res) =>{
try {
    res.render('newUser')
} catch (error) {
    console.log(error.message);
    
}}

//adding new user
exports.addUser = async(req,res)=>{
    try{

        const name = req.body.name;
        const email = req.body.email
        const password= req.body.password   ;
        console.log(name,password,email);
        const hashedPassword = await bcrypt.hash(password,10)
        const newaddUser = new User({
            name,
            email,
            password:hashedPassword,
            is_admin:0
        })
        console.log("new data entered");
        await newaddUser.save()
        req.app.locals.specialContext="User is added"
     res.redirect('/admin/home')
    }catch(error){
        console.log(error.message);
    }
}


// Edit UserLoad
exports.editUserLoad = async(req,res)=>{
    try {
        const id = req.query.id;
        const editUserData = await User.findById({_id:id});
        if(editUserData){
            res.render('editUser',{user:editUserData})
        }else{
            res.redirect('/admin/home')

        }
        
    } catch (error) {
        console.log(error.message);
        
    }
}

//edit user
exports.editUser = async(req,res)=>{
    try {
        const {id,name,email} =req.body;
        console.log(id);
        const existingUser = await User.findOne({email})
        if(existingUser){
            req.app.locals.specialContext="email already exist.!!!!"
            res.redirect('/admin/home')
        }else{
            await User.findByIdAndUpdate({_id:id},{$set:{name,email}})
            req.app.locals.specialContext="User Details updated..."
            res.redirect('/admin/home')
        }
    } catch (error) {
        console.log(error.message)
        
    }
}

//deleteuser load
exports.deleteUserLoad = async(req,res)=>{
    try {
        const id = req.query.id;
        await User.findByIdAndDelete({_id:id})
        req.app.locals.specialContext="User deleted successfully.."
        res.redirect('/admin/home')
        
    } catch (error) {
        console.log(error.message);
        
    }
}



//logout
exports.adminLogout = async (req,res)=>{
   req.session.destroy((err)=>{ 
    if(err){
        console.log(err);
        res.send("Error")
    }
    else{
        res.redirect('/admin')
    }
   })
}