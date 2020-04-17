const express = require('express'); 
const router = express.Router(); 


//Imported homeController. 
const userController = require('../controller/userController.js'); 


//Setting up the Home controller 
router.get('/profile', userController.profile); 
router.get('/', (req, res)=>{
    res.redirect('/user/profile'); 
}); 

//Setting up the logout controller for logout route similarly for the add-todo and delete-todo route. 
router.get('/logout', userController.logout); 

router.post('/add-todo', userController.addTodo); 
router.get('/delete-todo/:id', userController.deleteTodo); 

//Exporting the router. 
module.exports = router;