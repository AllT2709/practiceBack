const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const config = require('../../config2/config')
const UserModel = require('../../Models/user');
//const response = require('../../Network/response')


passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret,
}/*,
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
        }*/
    , async (token, done) => {
        try {
            //Pass the user details to the next middleware
            console.log(token.user.email)
            return done(null, token.user);
        } catch (error) {
            done(error);
        }
    }

));
