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
module.exports.deleteTodo = function(req, res){
    let arr = req.params.id.split(','); 
    arr.forEach(element => {
        Todo.findByIdAndDelete(element, (err)=>{
            if(err){
                console.log("Error while deleting document."); 
                return; 
            }
            console.log("deted succesfully!"); 
        })
    });
   res.redirect('back'); 
}