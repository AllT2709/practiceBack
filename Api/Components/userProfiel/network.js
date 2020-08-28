const passport = require('passport')
const {Router} = require('express');

const response = require('../../../Network/response');


const router = Router();

const OpToken = require('../../../Auth/Authenticate/jwtAuth')
const controller = require('./controller')
const jwtAuth = new OpToken();

router.get('/contacts',(req,res)=>{
    let userToken = jwtAuth.getToken(req);
    //console.log(userToken.user);
    if(userToken !== undefined){
        controller.list(userToken.user._id)
            .then(data =>{
                console.log(data);
                return response.success(req,res,data,200);
            })
            .catch(err =>{
                console.error(err);
            })
        
    }else{
         console.log('algo salio mal');
         return response.error(req,res,'Internal error')
    }
 })
 router.post('/contacts/add', (req,res)=>{
     let userToken = jwtAuth.getToken(req);
     //console.log(userToken);
     let newUser = {
         name: req.body.name,
         number: req.body.number,
         userId: userToken.user._id
     }
     controller.add(newUser)
        .then(data =>{
            return response.success(req,res,data,200);
        })
        .catch(err =>{
            return response.error(req,res,err,500);
        })
 })
 
router.get('/profile', (req,res)=>{
    response.success(req,res,`welcome [name user]`,200);
})

module.exports = router;