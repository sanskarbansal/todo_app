const Todo = require('../models/todo'); 
module.exports.home = function(req, res){
    Todo.find({}, (err, document)=>{
        if(err){
            console.log("Error while fetching documents!"); 
            return; 
        }
        let dates = []; 
        for(let todo of document){
            let date = new Date(todo.deadline); 
            dates.push(date.toDateString()); 
        }
        res.render('index', {todos: document, date: dates}); 
    }); 
}; 
module.exports.addTodo = function(req, res){
    Todo.create({
        description: req.body.description, 
        deadline: req.body.date, 
        category: req.body.category
    },
    (err, document)=>{
        if(err){
            console.log("Error while creating todo!"); 
            return ;
        }
        return res.redirect('back'); 
    }); 
    console.log(req.body); 
}