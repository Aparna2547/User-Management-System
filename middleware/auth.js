
exports.isLogin= async(req,res,next)=>{

    try{

        if(req.session.userId){
            next()
        }
        else{
            res.redirect('/')
        }
    }catch(error){
        console.log(error.message);
    }
}

exports.     isLogout= async(req,res,next)=>{

    try{

        if(req.session.userId){
            res.redirect('/dashboard')
        }
       else{
        next();
       }

    }catch(error){
        console.log(error.message);
    }
}

