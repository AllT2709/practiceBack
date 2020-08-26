const store = require('./store');


function getAll(idUser){
    return new Promise((reject,resolve) =>{
        if (idUser) {
            resolve(store.get());    
        }
        reject('there was an internal error');
        
    })
}

module.exports={
    list:getAll,
}