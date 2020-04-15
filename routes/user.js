const express = require('express'); 
const router = express.Router(); 


//Imported homeController. 
const userController = require('../controller/userController.js'); 


//Setting up the Home controller 
router.get('/profile', userController.profile); 
router.get('/', (req, res)=>{
    res.redirect('/user/profile'); 
})

router.post('/add-todo', userController.addTodo); 
router.get('/delete-todo/:id', userController.deleteTodo); 

//Exporting the router. 
module.exports = router;