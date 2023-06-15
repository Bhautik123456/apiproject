const express = require('express');

const port = 8002;

const app = express();

app.use(express.urlencoded());

const db = require('./config/mongoose');

const passport = require('passport');
const session = require('express-session');
const jwtStrategy = require('./config/passport-jwt-strategy');

const cors = require('cors');
app.use(cors());

app.use(session({
    name : "Api_rnw",
    secret : "apiNode",
    saveUninitialized : true,
    resave : true,
    cookie :{
        maxAge : 60*100*100
    }
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use("/",require('./routes/index'));


app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Server is running on port:",port);
})