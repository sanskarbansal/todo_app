const express = require('express'); 
const router = express.Router(); 


//Imported homeController. 
const homeController = require('../controller/homeController.js'); 
const passport = require('passport'); 


router.use('/user', require('./user')); 

//Setting up the Home controller 
router.get('/', homeController.home); 
router.post('/sign-in', passport.authenticate('local', {
    successRedirect: '/user/profile', 
    failureRedirect: '/'
}));
router.post('/sign-up',homeController.createUser);


//Exporting the router. 
module.exports = router;