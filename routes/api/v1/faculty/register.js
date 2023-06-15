const express = require('express');

const routes = express.Router();

const FacultyController = require('../../../../controller/api/v1/faculty/FacultyController');

const passport = require('passport');

routes.get("/loginfailed", (req,res)=>{
    return res.json({status:400,msg:"First You have to Login"});
})

routes.post("/register", passport.authenticate('jwt',{failureRedirect:"/faculty/loginfailed"}),FacultyController.register);

routes.post("/facultylogin", FacultyController.facultyLogin);

routes.get("/profile", passport.authenticate('faculty-login', {failureRedirect:"/faculty/loginfailed"}), FacultyController.profile);

routes.get("/myprofile", async (req,res)=>{
   return res.json({'status':200, msg:req.user});
})

module.exports = routes;

// validation 
// JOI
// express-validator



// Coach  with JWT
//   - Register 
//   - Login
//   - profile
//   - changePassword



// Coach Token 
// cricketer
//  - Register (username, email , password,age, type:, gender:, city, image:  ) (coach Token)
//  - changepassword (cricketer Token)
//  - Login Cricketer (No Token)
//  - Profile (Cricketer Token)
//  - All cricketer details (Coach Token)
//  - Update cricketer details (cricketer Token)

