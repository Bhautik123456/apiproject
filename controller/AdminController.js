const Admin = require('../model/Register');
const Student = require('../model/student');

const jwt = require('jsonwebtoken');

module.exports.register = async (req,res) =>{
    let checkEmail = await Admin.findOne({email : req.body.email});
    if(checkEmail){
        return res.json({'status':200, 'msg': "Email is already register"});
    }
    else
    {
        req.body.role = 'Admin';
        let Admindata = await Admin.create(req.body);
        if(Admindata){
            return res.json({'status':200, 'msg': "Admin Record inserted"});
        }
        else{
            return res.json({'status':500, 'msg': "Something wrong"});
        }
    }
}


module.exports.getAllData = async (req,res) =>{
    return res.redirect('/getAdminData');   
}

module.exports.getAdminData = async (req,res) =>{
    let AdminData = await Admin.find({});
    if(AdminData){
        return res.json({'status':200, 'msg': "here is your records",'record': AdminData});
    }
    else{
        return res.json({'status':500, 'msg': "Something wrong"});

    }
}

module.exports.deleteData = async (req,res)=>{
    // console.log(req.params.id);
    let deleteData = await Admin.findById(req.params.id);
    if(deleteData){
        let dd = await Admin.findByIdAndDelete(deleteData.id);
        if(dd){
            return res.json({status:200,msg:"Record deleted"})
        }
        else{
            return res.json({status:400,msg:"Something wrong"})
        }
    }
    else{
        return res.json({status:400,msg:"Record not exist"})
    }
}



module.exports.updateData = async (req,res) =>{
    let existRecord = await Admin.findById(req.params.id);
    if(existRecord)
    {
        let upRecord = await Admin.findByIdAndUpdate(existRecord.id,req.body)
        if(upRecord){
            return res.json({status:200,msg:"Record Updated Success"})
        }
        else{
            return res.json({status:400,msg:"Something wrong"})
        }
    }
    else{
        return res.json({status:400,msg:"Record not exist"})
    }
}



module.exports.adminLogin = async (req,res) =>{
    let checkEmail = await Admin.findOne({email : req.body.email});
    if(checkEmail)
    {
        if(checkEmail.password == req.body.password){
            let token = jwt.sign({data : checkEmail},'rnw',{expiresIn : 84600});
            // req.session.token = token;
            // return res.redirect('/') 
            return res.json({status:200,msg:"Your token here",'token': token}); 

        }
        else{
            return res.json({status:400,msg:"Invalid password"});
        }
    }
    else{
        return res.json({status:400,msg:"email not exist"})
    }
}


module.exports.addAllFields = async (req,res) =>{
    // console.log(req.files);
    // console.log(req.body);


    var singleImage = '';
    if(req.files.image){
        singleImage = Student.singleAvatarPath+"/"+req.files.image[0].filename;
    }
    req.body.image = singleImage;
    console.log(singleImage);

    var multiImage = [];
    if(req.files.multiImage){
        for(var i=0; i<req.files.multiImage.length; i++){
            multiImage.push(Student.multiAvatarPath+"/"+req.files.multiImage[i].filename);
        }
    }
    // console.log(multiImage);
    req.body.multiImage = multiImage;

    await Student.create(req.body);
    return res.json({status: 200, "msg": "All record store successfully"});
}



module.exports.adminLogout = async (req,res) =>{
    req.logout(function(err){
        if(err){
            return res.json({'status':200,'msg':err})
        }
        else{
            return res.json({'status':200, 'msg':"Logout Successfully"});
        }
    })
}


module.exports.aggregateFun = async (req,res) =>{
    let Data = await Admin.aggregate([
        { $match : {password : "12345"}},
        { $sort :{ name : -1}}
    ])

    return res.json({status:200, 'data':Data});
}