const express = require('express'), bodyParser = require('body-parser'); 
const app = express(); 
const PORT = 5500 ;

//Imported database files. 
const db = require('./config/mongoose'); 
const Todo = require('./models/todo');

//Setting Up View Engine i.e EJS.
app.set('view engine', 'ejs'); 

//Setting Up view directory i.e 'views'.
app.set('views', './views'); 

//Setting up middleware for accesing the request data using body parser. 
app.use(bodyParser.urlencoded({extended: true})); 

//Setting up the 'assets' folder as static so that css, javascript and images can be accessed without routing. 
app.use(express.static('./assets')); 

//Setting Up Home route. 
app.use('/', require('./router/index')); 


//Started server on port 5500.

app.listen(PORT, (err)=>{
    if(err){
        console.log(err); 
        return ;
    }
    console.log(`Server started on port: ${PORT}....`); 
}); 