const passport = require('passport')
const {Router} = require('express');

const response = require('../../../Network/response');


const router = Router();


router.get('/profile', (req,res)=>{
    response.success(req,res,`welcome [name user]`,200);
})

module.exports = router;