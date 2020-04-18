const mongoose = require('mongoose'); 

//Setting up connnection with mongodb using mongoose(ODM).  

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}); 

//Grabbing the connection in a variable db.
const db = mongoose.connection; 


//If error event occur then do this........
db.on('error', (err)=>{
    console.log("Error occured while connecting to database."); 
    return ;
}); 


//if connection is succesfull then .......... 
db.once('open', ()=>{
    console.log("Database successfully connected!"); 
}); 

module.exports = db; 
