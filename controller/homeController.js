const User = require('../models/user'); 

module.exports.home = function(req, res){
    res.render('index'); 
}

module.exports.createUser = function(req, res){
    User.findOne({username: req.body.uname}, (err, doc)=>{
        
        if(err){
            console.log("Error while finding the user in createUser!"); 
            return; 
        }
        if(doc){
            console.log(doc); 
            return res.redirect('/'); 
        }
        User.create({username: req.body.uname, 
            password: req.body.pname, 
            name: req.body.name, 
            email: req.body.email
        }, (err)=>{
            if(err){
                console.log("Error while creating a user in createUser"); 
                return; 
            }
            return res.redirect('/'); 
        })
    })
}