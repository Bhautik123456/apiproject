const express = require('express');

const routes = express.Router();

const adminController = require('../controller/AdminController');

const passport = require('passport');

const Student = require('../model/student');

routes.post("/register",adminController.register);

routes.get("/loginfailed", (req,res)=>{
    return res.json({status:400,msg:"First You have to Login"});
})

routes.get("/getAllData",passport.authenticate('jwt',{failureRedirect:"/loginfailed"}),adminController.getAllData);

routes.get("/getAdminData",passport.authenticate('jwt',{failureRedirect:"/loginfailed"}), adminController.getAdminData);

routes.delete("/deleteData/:id", passport.authenticate('jwt',{failureRedirect:"/loginfailed"}),adminController.deleteData);

routes.patch("/updateData/:id", adminController.updateData);

routes.post("/adminLogin", adminController.adminLogin);

routes.post("/add_all_fields", Student.uploadedAvatar,adminController.addAllFields);


routes.get("/adminLogout", passport.authenticate('jwt', {failureRedirect:"/faculty/loginfailed"}), adminController.adminLogout);


routes.get("/adminprofile", passport.authenticate('jwt', {failureRedirect:"/faculty/loginfailed"}), async (req,res)=>{
    return res.json({status:200,'msg': req.user});
})

routes.get("/aggregateFun", adminController.aggregateFun);

routes.use("/faculty", require('./api/v1/faculty/register'));
routes.use("/student", require('./api/v1/student'));

module.exports = routes;