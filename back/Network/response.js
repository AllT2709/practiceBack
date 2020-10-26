//Si la petición fue exitosa
exports.success = function(req,res,message,status){
    let statusCode = status || 200;
    let statusMessage = message || '';

    res.status(statusCode).send({
        error: false,
        status: status,
        body: statusMessage
    })
}

//Si la petición fue fallida
exports.error = function(req,res,message,status){
    let statusCode = status || 500;
    let statusMessage = message || 'Internal server error';

    res.status(statusCode).send({
        error: true,
        status: status,
        body: statusMessage
    })
}