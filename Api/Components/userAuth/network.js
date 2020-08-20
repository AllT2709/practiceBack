const {Router}= require('express');
const passport = require('passport');

const response = require('../../../Network/response');
const OpToken = require('../../../Auth/Authenticate/jwtAuth')
const config = require('../../../Config/config')
require('../../../Auth/Strategies/localStrategy');


const router = Router();
const jwtAuth =new OpToken();


router.get('/',function(req,res){
    res.send('Bienvenido!!!');
});
router.post('/login', (req,res)=>{

    //autenticacion del login

    passport.authenticate('login',  (err,user)=>{
        if(err || !user){
           return response.error(req,res,err,400);
        }
        req.logIn(user,{session: false}, async (err)=>{
            let data = [
                user._id,
                user.email,
                user.password
            ];
            if (err) {
                return response.error(req,res,err);
            }
            
           let token = await jwtAuth.sign(data,config.jwt.secret);
            return response.success(req,res,token,200);

        })
    })


});
router.post('/register',passport.authenticate('register',{session: false}) ,(req,res,next)=>{
    
    return response.success(req,res,'User created',200);
    /*passport.authenticate('register',(err,user)=>{
        
        if(err || !user){
            response.error(req,res,err,400);
        }
        else{
            req.logIn(user,err=>{
                
                if(err){
                    //response.error(req,res,err,400)
                    return next(err);
                }
                return response.success(req,res,'User created',200);

                
            })
        }
    })(req,res,next);*/
})


module.exports =router;
