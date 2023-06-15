const passport = require('passport');

const jwtStrategy = require('passport-jwt').Strategy;

const ExtractStrategy = require('passport-jwt').ExtractJwt;

const Admin = require('../model/Register');
const Faculty = require('../model/Faculty');

const opts = {
    jwtFromRequest : ExtractStrategy.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'rnw'
}

passport.use(new jwtStrategy(opts, async (userData,done) =>{
    let adminData = await Admin.findOne({email: userData.data.email});
    console.log("Admin login");
    console.log(adminData);
    if(adminData){
        if(adminData.password == userData.data.password){
            return done(null,adminData);
        }
        else{
            return done(null,false);
        }
    }
    else{
        return done(null,false)
    }
}))


passport.use('faculty-login',new jwtStrategy(opts, async (userData,done) =>{
    let facultyData = await Faculty.findOne({email: userData.data.email});

    if(facultyData){
        if(facultyData.password == userData.data.password){
            return done(null,facultyData);
        }
        else{
            return done(null,false);
        }
    }
    else{
        return done(null,false)
    }
}))


passport.serializeUser((user,done)=>{
    return done(null,user.id);
})

passport.deserializeUser(async (id,done) => {

    let AdminData = await Admin.findById(id);
    if(AdminData){
        return done(null, AdminData);
    }
    else{
        let FacultyData = await Faculty.findById(id);
        if(FacultyData){
            return done(null, FacultyData);
        }
        else{
            return done(null,false);
        }
    }
})

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        if(req.user.role  == 'Admin'){
            res.locals.admin = req.user;
        }
        else{
            res.locals.faculty = req.user;
        }
    }
    next();
}

module.exports = passport;