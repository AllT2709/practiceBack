const passport = require("passport")


const LocalStrategy = require("passport-local").Strategy
const bcrypt = require('bcrypt');

const UserModel = require('../../Models/user');

const error = require('../../utils/error')


/*passport.serializeUser((user,cb)=>{
    cb(null,user._id);
})

passport.deserializeUser((id,cb)=>{
    UserModel.findById(id)
        .then((user)=>{
            cb(null,user);
        })
})*/

passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    async function (req, email, password, cb) {
        await UserModel.findOne({ email })
            .then((user) => {
                if (user !== null) {
                    //console.log(user);
                    let err = new error("That user is registered", 401);
                    //let err = JSON.stringify({message: 'That user is registered'})
                    return cb(err, null);
                }
                else {

                    bcrypt.hash(password, 5)
                        .then(hashPass => {

                            let newUser = new UserModel({
                                name: req.body.name,
                                username: req.body.username,
                                email,
                                password: hashPass
                            });
                            newUser.save();
                            return cb(null, newUser);
                        })
                }


            })
            .catch((err) => {
                return cb(err);
            })
    }));


passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async function (email, password, cb) {
        await UserModel.findOne({ email })
            .then(user => {
                if (!user) {
                    let err = new error("that email is not registered", 401);
                    //let err = JSON.stringify({ message: 'that email is not registered' })
                    return cb(err, false);
                } else {
                    bcrypt.compare(password, user.password)
                        .then(responsePass => {
                            if (!responsePass) {
                                let err = new error("bad password", 401);
                                //let err = JSON.stringify({ message: 'bad password' })
                                return cb(err, false);
                            }
                            return cb(null, user);

                        })
                }
            })
            .catch(err => {
                return cb(err, false);
            })
    }));


