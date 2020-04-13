const mongoose = require('mongoose'); 

//Extracted Schema Class from mongoose. 
const Schema = mongoose.Schema; 

//Created Todo Schema with three fields[description, date/deadline, category]. 
const todoSchema = new Schema({
    description: {
        type: String, 
        required: true
    },
    deadline: {
        type: Date, 
        required: true
    }, 
    category: {
        type: String, 
    }
}); 

//Created model of this schema and exported. 
module.exports = mongoose.model('todo', todoSchema); 