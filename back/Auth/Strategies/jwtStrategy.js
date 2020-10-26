const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const config = require('../../config3/config')
const UserModel = require('../../Models/user');
//const response = require('../../Network/response')


passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret,
}, async (token, done) => {
        try {
            //Pass the user details to the next middleware
            console.log(token.user.email)
            return done(null, token.user);
        } catch (error) {
            done(error);
        }
    }

));
