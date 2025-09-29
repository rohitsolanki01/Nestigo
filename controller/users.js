const { model } = require("mongoose");
const User = require("../models/user.js")





module.exports.renderSignUpForm = (req,res) => {
    res.render("users/signup.ejs");
}


module.exports.signUp =  async (req,res,next) => {
    try{
        let {username , email , password} = req.body;
        let newUser = new User({
            username : username,
            email : email
        });
    
       let resisterUser = await User.register(newUser ,password);
       console.log(resisterUser);
       req.login(resisterUser , (err) => {
        if(err){
            return next(err);
        }
        req.flash("success" , "welcome to Nestigo");
        res.redirect("/listings");
       })
    }catch(e) {
        req.flash("error" , e.message);
        res.redirect("/signup");
    }

}



module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs");
}




module.exports.login = async (req,res) => {
    req.flash("success", "Welcome back to Nestigo!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}


module.exports.logOut = (req,res,next) => {
    req.logOut( err => {
        if (err){
            return next(err);
        }   
        req.flash("success" , "logout Successfully!");
      res.redirect("/listings");
    })
}


