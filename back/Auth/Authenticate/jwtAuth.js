//const jwt = require('jsonwebtoken');

const jwtAuth = require('jsonwebtoken');
const config = require('../../config3/config');
const error = require('../../utils/error')

class OpToken {
    constructor() {
        this.secret = config.jwt.secret;
    }

    sign(data) {
        return jwtAuth.sign(data, this.secret);
    }

    decoded(token) {
        console.log(token)
        return jwtAuth.decode(token);

    }
    getToken(req) {
        //let token = req.headers.authorization || '';
        //console.log(req.headers.cookie);
        //if(!req.headers.cookie){...}
        if(!req.headers.authorization){
            //esto no me funciona
            throw error('No esta autorizado!!',401)
        }
        //let token = req.headers.cookie|| '';
        let token = req.headers.authorization || '';
        token = token.replace('Bearer ', '')
        return this.decoded(token);
    }
}

module.exports = OpToken;