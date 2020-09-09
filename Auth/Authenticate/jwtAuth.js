//const jwt = require('jsonwebtoken');

const jwtAuth = require('jsonwebtoken');
const config = require('../../config/config');


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
        let token = req.headers.authorization || '';
        token = token.replace('Bearer ', '')
        return this.decoded(token);
    }
}

module.exports = OpToken;