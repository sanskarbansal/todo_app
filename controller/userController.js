//Importing the Todo Model for (CRD Operations). 
const Todo = require('../models/todo'); 

//Controller for home route i.e /index . 
module.exports.profile = function(req, res){
    if(!req.isAuthenticated()){
        return res.redirect('/'); 
    } 
    //Fetching the al the todo's  data and passing it to the view i.e ejs template. 
    Todo.find({user: req.user._id}, (err, documents)=>{
        if(err){
            console.log("Error while fetching documents!"); 
            return; 
        }
        let dates = []; 

        //Modifying date and then passing it to ejs template. 
        // This will modify all dates {from:"2019-10-30 00:00:00.000Z" => TO: "Wed Oct 30 2019"}.
        for(let todo of documents){
            let date = new Date(todo.deadline); 
            dates.push(date.toDateString()); 
        }

        res.render('user', {todos: documents, date: dates, user: req.user}); 
    }); 
}; 


//Logout Controller.
module.exports.logout = function(req, res){
    //If the user is authenticated then clear cookie. 
    //  redirect to /index         
    if(req.isAuthenticated()){
        req.logout(); 
    }
     return res.redirect('/'); 

}

//Controller for add-todo route i.e /add-todo.
module.exports.addTodo = function(req, res){

    //If the user is authenticated then only let the user to add the todo. 
    //Else redirect it back to /index
    if(req.isAuthenticated()){
        var desc = req.body.description; 
        var date = req.body.date; 
        var cat = req.body.category; 
        var uid = req.user._id; 
        
        //Validating whether the form data is blank or not. 
        if(desc.trim() != "" && date.trim() != ""){
        //Creating a documnet of Todo Schema. 
            Todo.create({
                description: desc, 
                deadline: date, 
                category: cat, 
                user: uid
            },
            (err, document)=>{
                if(err){
                    console.log("Error while creating todo!"); 
                    return ;
                } 
            });
        }
        return res.redirect('back');   
    }else{
        return res.redirect('/'); 
    }
}


//Controller for the delete route i.e /delete-todo . 
module.exports.deleteTodo = function(req, res){

    /*
    Parameters are splitted by ',' 
    Request that is comming looks like http://domain.com/user/delete-todo/5e953841ff05b644a8d1b80e,5e953841ff05b644a8d1b80e 
    this gets converted to an array of [5e953841ff05b644a8d1b80e,5e953841ff05b644a8d1b80e ](If 2 todo are selected similarly for n todo's)
    */

    //Check if the user is authenticated or not and if not then don't give the permission to user to delete the todo. 
    if(req.isAuthenticated()){
        let arr = req.params.id.split(','); 
        arr.forEach(element => {
            if(element.user == req.user.id){
                Todo.findByIdAndDelete(element, (err)=>{
                    if(err){
                        console.log("Error while deleting document."); 
                        return; 
                    }
                });
            }
        });
        return res.redirect('back'); 
    }else{
        return res.redirect('back'); 
    }
}