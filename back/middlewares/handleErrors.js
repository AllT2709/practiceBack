function logError(err,req,res,next){
    console.error(err.stack);
    next(err);
}
function errorHandler(err,req,res,next){
    res.status(500);
    res.json({error: err, message:'there was a error'});
}

module.exports = {
    logError,
    errorHandler
}