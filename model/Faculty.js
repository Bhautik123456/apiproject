const mongoose = require('mongoose');

const FacultySchema = mongoose.Schema({
    faculty_name : {
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
    role : {
        type : String,
        required : true
    },
    student_id : {
        type : Array,
        ref : 'StudentD',
        required : true
    }
});

const Faculty = mongoose.model('Faculty',FacultySchema);

module.exports = Faculty;