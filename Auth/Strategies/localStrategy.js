const passport = require("passport")


const LocalStrategy = require("passport-local").Strategy
const bcrypt = require('bcrypt');

const UserModel = require('../../Models/user');


/*passport.serializeUser((user,cb)=>{
    cb(null,user._id);
})

passport.deserializeUser((id,cb)=>{
    UserModel.findById(id)
        .then((user)=>{
            cb(null,user);
        })
})*/

passport.use('register',new LocalStrategy({
    usernameField: 'email',
    passwordField:  'password'
    },
    async function(email,password,cb){
        if(!email || !password){
            return cb(err,false,{message: 'require parameters'});
        }
         await UserModel.findOne({email})
            .then((user) =>{
                if(user !=null){
                    //console.log(user);
                    return cb(null,false,{message: 'That user is registered'});
                }
                else{

                    bcrypt.hash(password,5)
                        .then(hashPass =>{
    
                            let newUser = new UserModel({
                                email,
                                password: hashPass
                            });
                            newUser.save();
                            return cb(null,newUser);
                        })
                }
                
        
            })
            .catch((err)=>{
                return cb(err);
            })
}));
    

passport.use('login',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    async function(email,password,cb){
        await UserModel.findOne({email})
            .then(user =>{
                if(!user){
                    return cb(err,false,{message: 'bad email'});
                }else{
                    bcrypt.compare(password,user.password)
                        .then(responsePass=>{
                            if(!responsePass){
                                return cb(err,false,{message: 'bad password'});
                            }
                        return cb(null,user);

                    })
                 }
            })
            .catch(err =>{
                return cb(err,false);
            })
}));
 

