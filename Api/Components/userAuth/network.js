const { Router } = require('express');
const passport = require('passport');

const response = require('../../../Network/response');
const OpToken = require('../../../Auth/Authenticate/jwtAuth')
//const config = require('../../../Config/config')
require('../../../Auth/Strategies/localStrategy');


const router = Router();
const jwtAuth = new OpToken();


router.get('/', function (req, res) {
    res.send('Bienvenido!!!');
});


/*router.post('/login', async (req, res, next) => {

    //autenticacion del login
    console.log(">>" + req);
    passport.authenticate('login', async (err, user, info) => {
        if (err || !user) {
            return response.error(req, res, err, 400);
        }
        console.log(">>Z" + user);
        req.login(user, { session: false }, async (err) => {
            let data = [
                user._id,
                user.email,
                user.password
            ];
            if (err) {
                return response.error(req, res, err);
            }

            let token = jwtAuth.sign(data, config.jwt.secret);
            return response.success(req, res, token, 200);

        })
    })


});*/
router.post('/login', async (req, res, next) => {
    console.log(">>" + req);
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An Error occurred')
                return next(error);
            }
            req.login(user, { session: false }, async (error) => {
                if (error) return next(error)
                //We don't want to store the sensitive information such as the
                //user password in the token so we pick only the email and id
                const body = { _id: user._id, email: user.email };
                //Sign the JWT token and populate the payload with the user email and id
                const token = jwtAuth.sign({ user: body }, 'top_secret');
                //Send back the token to the user
                return res.json({ token });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

router.post('/register', passport.authenticate('register', { session: false }), (req, res, next) => {

    return response.success(req, res, 'User created', 200);
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


module.exports = router;
