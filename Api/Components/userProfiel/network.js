const passport = require('passport')
const {Router} = require('express');

const response = require('../../../Network/response');


const router = Router();

const OpToken = require('../../../Auth/Authenticate/jwtAuth')

const jwtAuth = new OpToken();

router.get('/contacts',(req,res)=>{
    let userToken = jwtAuth.getToken(req);
    if(userToken !== undefined){
        return response.success(req,res,userToken,200);
    }else{
         console.log('algo salio mal');
         return response.error(req,res,'Internal error')
    }
 })
 
router.get('/profile', (req,res)=>{
    response.success(req,res,`welcome [name user]`,200);
})

module.exports = router;