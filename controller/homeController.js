const User = require('../models/user'); 
const flash = require('connect-flash'); 
const shortid = require('shortid');
// Controller for /index route. 
module.exports.home = function(req, res){
    if(req.isAuthenticated()){
       return  res.redirect('/user/profile'); 
    }
    res.render('index', {message: req.flash('message'), log_s: req.flash('error')}); 
}

//Controller for /user/sign-up route which will create a new user.
module.exports.createUser = function(req, res){
    
    //First check if the user is already registered or not. 
    User.findOne({username: req.body.uname}, (err, doc)=>{
        
        if(err){
            console.log("Error while finding the user in createUser!"); 
            return; 
        }

        //If user found then redirect to /index route. 
        if(doc){
            req.flash('message', "User Already Exists"); 
            return res.redirect('/'); 
        }

        //If user not found then create a new user and redirect to /index. 
        User.create({username: req.body.uname, 
            password: req.body.pname, 
            name: req.body.name, 
            email: req.body.email, 
            shareLink: shortid.generate()
        }, (err)=>{
            if(err){
                console.log("Error while creating a user in createUser"); 
                return; 
            }
            req.flash('message', "User Successfully Created!"); 
            return res.redirect('/'); 
        })
    })
}