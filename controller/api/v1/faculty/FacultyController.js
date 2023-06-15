const Faculty = require('../../../../model/Faculty');

const jwt = require('jsonwebtoken');

module.exports.register = async (req,res) =>{
    
    req.body.role = 'faculty';
    let facultyData = await Faculty.create(req.body);
    if(facultyData){
        return res.json({status:200, 'msg': "faculty Record inserted successfully"});
    }
    else{
        return res.json({status:400, 'msg': "Something wrong"});
    }
}

module.exports.facultyLogin = async (req,res) =>{
    let checkEmail = await Faculty.findOne({email : req.body.email});
    if(checkEmail)
    {
        if(checkEmail.password == req.body.password){
            let token = jwt.sign({data : checkEmail},'rnw',{expiresIn : 84600})
            return res.json({status:200,msg:"Your token here",'token': token})  

        }
        else{
            return res.json({status:400,msg:"Invalid password"})
        }
    }
    else{
        return res.json({status:400,msg:"email not exist"})
    }
}

module.exports.profile = async (req,res) =>{
   

    let facultydetails = await Faculty.findById(req.user.id).populate('student_id').exec();
    let counts = facultydetails.student_id.length;
   return res.json({'msg': facultydetails,'status':200,'studentCount':counts});
}