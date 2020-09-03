const passport = require('passport')
const { Router } = require('express');

const response = require('../../../Network/response');


const router = Router();

const OpToken = require('../../../Auth/Authenticate/jwtAuth')
const controller = require('./controller')
const jwtAuth = new OpToken();

const UserModel = require('../../../Models/user');

router.get('/contacts', async (req, res) => {
    let userToken = jwtAuth.getToken(req);
    //console.log(userToken.user._id);
    if (userToken !== undefined) {
        /*controller.list(userToken.user._id)
            .then(data => {
                console.log(data);
                return response.success(req, res, data, 200);
            })
            .catch(err => {
                console.error(err);
            })*/
        var data = await controller.list(userToken.user._id);
        return response.success(req, res, data, 200);

    } else {
        console.log('algo salio mal');
        return response.error(req, res, 'Internal error')
    }
})
router.post('/contacts/add', async (req, res) => {
    let userToken = jwtAuth.getToken(req);
    //console.log(userToken.user._id);
    console.log(">>" + JSON.stringify(userToken.user))
    //let user = userToken.user._id;
    var user = await UserModel.findOne({ _id: userToken.user._id });
    console.log(JSON.stringify(user))

    let { name, number } = req.body
    let newUser = {
        name: name,
        number: number,
        userId: user,
    }
    console.log("new user:" + newUser)
    controller.add(newUser)
        .then(data => {
            return response.success(req, res, data, 200);
        })
        .catch(err => {
            return response.error(req, res, err, 500);
        })
})

router.put('/contacts/:id', async function(req,res){
    let data = {}
    if(req.body.name){
        data.name = req.body.name;
    }
    if(req.body.number){
        data.number = req.body.number;
    }
    controller.update(req.params.id,data)
        .then(datos =>{
            return response.success(req,res,datos,200);
        })
        .catch(err =>{
            return response.error(req,res,err,400);
        })
})

router.delete('/contacts/:id', async function(req,res){
    controller.delete(req.params.id)
        .then(data=>{
            return response.success(req,res,'user deleted!!',200);
        })
        .catch(err=>{
            return response.error(req,res,err,401);
        })
})

router.get('/profile', (req, res) => {
    let userToken = jwtAuth.getToken(req);
    console.log(">>" + JSON.stringify(userToken));
    response.success(req, res, `welcome ${userToken.user.email}`, 200);
})

module.exports = router;