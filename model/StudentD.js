const mongoose = require('mongoose');

const StudentDSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    course:{
        type : String,
        required : true
    },
    faculty_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Faculty",
        required : true
    },
    role : {
        type : String,
        required : true
    }
});

const StudentD = mongoose.model('StudentD',StudentDSchema);

module.exports = StudentD;