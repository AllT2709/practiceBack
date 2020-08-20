const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const config = require('../../Config/config')
const UserModel = require('../../Models/user');
//const response = require('../../Network/response')


passport.use('jwt',new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt.secret,
    },
     async function(jwtPayload,cb){
        await UserModel.findOne({email: jwtPayload.email})
            .then(user =>{
                if(!user){
                     cb(err,false,{message: 'something wrong'})
                }
                    cb(null,user);
            }) 
            .catch(err =>{
                    cb(err);
                })
        }
        
));
