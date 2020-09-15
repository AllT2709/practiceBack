const passport = require("passport")


const LocalStrategy = require("passport-local").Strategy
const bcrypt = require('bcrypt');

const UserModel = require('../../Models/user');
const { json } = require("express");


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
            let err = JSON.stringify({message: 'require parameters'})
            return cb(err,false);
        }
         await UserModel.findOne({email})
            .then((user) =>{
                if(user !==null){
                    //console.log(user);
                    //let err =  new Error("That user is registered");
                    let err = JSON.stringify({message: 'That user is registered'})
                    return cb(err,null);
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
        if(!email || !password){
            let err = JSON.stringify({message: 'require data'})
            return cb(err,false);
        }
        await UserModel.findOne({email})
            .then(user =>{
                if(!user){
                    let err = JSON.stringify({message: 'that email is not registered'})
                    return cb(err,false);
                    //return cb(err,false,{message: 'bad email'});
                }else{
                    bcrypt.compare(password,user.password)
                        .then(responsePass=>{
                            if(!responsePass){
                                let err = JSON.stringify({message: 'bad password'})
                                return cb(err,false);
                                //return cb(err,false,{message: 'bad password'});
                            }
                            return cb(null,user);

                        })
                }
            })
            .catch(err =>{
                return cb(err,false);
            })
}));
 

