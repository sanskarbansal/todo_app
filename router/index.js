const express = require('express'); 
const router = express.Router(); 

const homeController = require('../controller/index.js'); 
router.get('/', homeController.home); 
router.post('/add-todo', homeController.addTodo); 
router.get('/delete-todo/:id', homeController.deleteTodo); 

module.exports = router;