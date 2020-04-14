const express = require('express'); 
const router = express.Router(); 


//Imported homeController. 
const homeController = require('../controller/index.js'); 


//Setting up the Home controller 
router.get('/', homeController.home); 
router.post('/add-todo', homeController.addTodo); 
router.get('/delete-todo/:id', homeController.deleteTodo); 

//Exporting the router. 
module.exports = router;