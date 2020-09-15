//requerimos lo paquetes
const express = require('express');
const config = require('./config3/config')
const db = require('./Network/db');
const userAuth = require('./Api/Components/userAuth/network')
const user = require('./Api/Components/userProfiel/network');
const passport = require('passport');
const app = express();
const errors = require('./middlewares/handleErrors')


require('./Auth/Strategies/jwtStrategy')
//conecting database
db(config.db.dbURL);

//middleware
app.use(express.json());
app.use(passport.initialize());
app.use(errors.errorHandler)
app.use(errors.logError)

//routes
app.use('/auth',userAuth);
app.use('/api',passport.authenticate('jwt',{session: false}),user);

app.listen(config.api.port,function(){
    console.log(`Server listen on Port ${config.api.port}`);
})