const mongoose = require('mongoose');

const singleAvatarPath = "/singleImage";
const multiAvatarPath = "/multiImage";

const multer = require('multer');

const path = require('path');

const StudentSchema = mongoose.Schema({
    username : {
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
    gender : {
        type : String,
        required : true
    },
    hobby : {
        type : Array,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    multiImage : {
        type : Array,
        required : true
    }

});

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        if(file.fieldname=='image')
        {
          cb(null, path.join(__dirname,'..',singleAvatarPath));
        }
        else{
            cb(null, path.join(__dirname,'..',multiAvatarPath));
        }
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
})

StudentSchema.statics.uploadedAvatar = multer({storage : storage}).fields([{name:"image",maxCount : 1},{name:"multiImage",maxCount:5}])
StudentSchema.statics.singleAvatarPath = singleAvatarPath;
StudentSchema.statics.multiAvatarPath = multiAvatarPath;


const Student = mongoose.model('Student',StudentSchema);
module.exports = Student;