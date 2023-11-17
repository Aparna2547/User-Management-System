const User = require("../models/userModel")
const bcrypt = require('bcrypt')
// const cookieParser = require('cookie-parser')
const userRoute = require("../routes/userRouter")
const nocache = require('nocache')



//Login
exports.loadLogin = async (req,res)=>{
    try {
       //warning message
       var context = req.app.locals.specialContext;
       req.app.locals.specialContext = null;

        res.render('user/login',{context})
        
        
    } catch (error) {
        console.log(error.message);
    }
}


 //register
exports.loadRegister = async (req,res)=>{
    try{
        var context = req.app.locals.specialContext;
        req.app.locals.specialContext = null;

        res.render('user/signup',{context})
    }catch(error){
        console.log(error.message);
    }
}



//dashbooard for user
exports.loadDash = async(req,res)=>{
    try {
        res.render('user/dashboard')
    }catch(error){
        console.log(error.message);
    }
}


//post register
exports.userRegister = async(req,res)=>{
    try {
       
          
        const {name,email,password} = req.body
        console.log(name , email,password)

        //
        const existingUser = await User.findOne({email})
        if(existingUser){
            req.app.locals.specialContext="Email already existed"
           res.redirect('/register')
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = new User({
                name,
                email,
                password:hashedPassword,
                is_admin:0
            })
            console.log("data entered to db..");
            await newUser.save();
        
            req.app.locals.specialContext="Registration successfull. Please login..."
            res.redirect('/')

        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Server error' });
    }
}



//password
exports.userLogin = async(req,res)=>{
    try {

        const {email,password} = req.body;
        console.log(email,password);
        const userFound = await User.findOne({email})
        console.log(userFound);
        if(userFound){
            // console.log('userfound')
            const hashedPassword = userFound.password;
            const passwordMatch = await bcrypt.compare(password,hashedPassword)
            console.log(passwordMatch);
            if(passwordMatch && userFound.is_admin ==0){
    
                req.session.userId = userFound._id
                    return res.redirect('/dashboard')
                            
            }
            else{
                return  res.redirect('/')
                
            }
        }
        else{
            req.app.locals.specialContext="Invalid login details..."
                res.redirect('/')
                console.log("password does nt match");
        }
    }catch (error){
        console.log(error.message);
        
    }
}

exports.userLogout =async(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.redirect('/')
        }
})
}




//post ,method for dash

exports.dashBoard = async(req,res)=>{
   
        res.redirect('dashboard')
      }
