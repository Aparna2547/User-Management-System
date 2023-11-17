
exports.isadminLogin= async(req,res,next)=>{

    try{

        if(req.session.adminId){
            next()
        }
        else{
            res.redirect('/admin')
        }
    }catch(error){
        console.log(error.message);
    }
}



exports.isadminLogout= async(req,res,next)=>{

    try{

        if(req.session.adminId){
            res.redirect('/admin/home')
        }
       else{
        next();
       }

    }catch(error){
        console.log(error.message);
    }
}

