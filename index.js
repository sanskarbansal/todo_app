//Importing Modules
const express = require('express'), expressLayout = require('express-ejs-layouts'), bodyParser = require('body-parser'); 
const passport = require('./config/passport_config'), session = require('express-session');
const flash = require('connect-flash'); 
//Setting up express
const app = express(); 
const PORT = (process.env.PORT || 5500);
 
//Imported database files and packages(session modules).
const MongoConnect = require('connect-mongo')(session), db = require('./config/mongoose_config');
const Todo = require('./models/todo');

app.use(flash()); 
//Setting Up View Engine i.e EJS.
app.set('view engine', 'ejs'); 

//Setting Up view directory i.e 'views'.
app.set('views', './views'); 

// setting up  the express layout middleware. 
app.use(expressLayout); 
app.set('layout extractScripts', true); 
app.set('layout extractStyles', true); 

//Setting up middleware for accesing the request data using body parser. 
app.use(bodyParser.urlencoded({extended: true})); 


// Setting up the express-session properties for the sessions that to be stored in the database, 
// Collection will be called as user_session made by connect-mongo.
//Secret Key=> It's not of your use please get away from this!
// Cookie name => garbage.

app.use(session({
    resave: false, 
    saveUninitialized: false, 
    name: "garbage", 
    secret: "It's not of your use please get away from this!", 
    cookie: {
        maxAge: 1000*60*60*24
    }, 
    store: new MongoConnect({
        mongooseConnection: db, 
        collection: 'user_sessions', 
        
    })
})); 

//Initializing passport and maintaining the session, deserializing the cookie. 
app.use(passport.initialize()); 
app.use(passport.session()); 

//Setting up the 'assets' folder as static so that css, javascript and images can be accessed without routing. 
app.use(express.static('./assets')); 

//Setting Up Home route. 
app.use('/', require('./routes/index')); 

app.use('*', (req, res)=>{
    res.render('404.ejs'); 
}); 

//Started server on port 5500.
app.listen(PORT, (err)=>{
    if(err){
        console.log(err); 
        return ;
    }
    console.log(`Server started on port: ${PORT}.`); 
}); 