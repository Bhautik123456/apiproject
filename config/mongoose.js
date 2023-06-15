const mongoose  = require('mongoose');


mongoose.connect('mongodb://127.0.0.1/apinode9');

const db = mongoose.connection;


db.once('open', async(err)=>{
    if(err){
        console.log("db is not connected");
        return false;
    }
    console.log("db is connected");
})

module.exports = db;