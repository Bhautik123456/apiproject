const Student  = require('../../../model/StudentD');
const Faculty = require('../../../model/Faculty');


module.exports.register = async (req,res) =>{
    req.body.role = 'student';
    let studentData = await Student.create(req.body);
    if(studentData){
        console.log(studentData.id);
        let faculyData =await Faculty.findById(req.body.faculty_id);
        await faculyData.student_id.push(studentData.id);
        await Faculty.findByIdAndUpdate(faculyData.id,{student_id:faculyData.student_id});
        return res.json({'status':200,'msg':"student record inserted"});
    }
    else{
        return res.json({'status':400,'msg':"Something wrong"});
    }
}