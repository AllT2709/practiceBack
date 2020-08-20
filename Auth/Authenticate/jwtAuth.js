//const jwt = require('jsonwebtoken');

const jwtAuth = require('jsonwebtoken');
const config = require('../../Config/config');


class OpToken {
    constructor(){
        this.secret = config.jwt.secret;
    }

    sign(data){
        return jwtAuth.sign(data,this.secret);
    }
}

module.exports = OpToken;