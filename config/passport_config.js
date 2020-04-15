const passport = require('passport'), LocalStrategy = require('passport-local').Strategy; 
const User = require('../models/user'); 

passport.use(new LocalStrategy(
    {
        usernameField: "uname", 
        passwordField: "pname"
    }, (uname, pname, done)=>{
        User.findOne({username: uname}, (err, doc)=>{
            if(err){
                console.log("Error while finding the user for authentication in passport!(LocalStrategy)"); 
                return done(err); 
            }
            if(!doc || doc.password != pname){
                return done(null, false); 
            }
            return done(null, doc); 
        })
    }
)); 

passport.serializeUser((user, done)=>{
    done(null, user.id); 
}); 

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, doc)=>{
        if(err){
            console.log("Error while finding the user while deserializing in deserializeUser() function!"); 
            return done(err); 
        }
        if(doc){
            return done(null, doc); 
        }
        return done(null, false); 
    })
}); 

module.exports = passport; 