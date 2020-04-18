const express = require('express'); 
const router = express.Router(); 
const passport = require('passport'); 



//Imported homeController. 
const homeController = require('../controller/homeController.js'); 
const userController = require('../controller/userController'); 

// Setting up the /user route 
router.use('/user', require('./user')); 



//Setting up the Home controller 
router.get('/', homeController.home); 
router.get('/:id', userController.shareProfile); 


//Authenticating the user using passport local strategy and if found then redirect it to /user/profile, 
//else redirect to /index
router.post('/sign-in', passport.authenticate('local', {
    successRedirect: '/user/profile',
    successFlash: 'Successfully Logged In!', 
    failureRedirect: '/', 
    failureFlash: 'Invalid Username/Password!'
}));

//Setting up the controller for /sign-up route. 
router.post('/sign-up',homeController.createUser);


//Exporting the router. 
module.exports = router;