const store = require('./store');


function getAll(idUser) {
    /*return new Promise((reject,resolve) =>{
        if (!idUser) {
            
            reject('there was an internal error'); 
        }
        resolve(store.get());  
        
    })*/
    return store.get()
}

function addContact(contact) {
    return new Promise((resolve, reject) => {
        if (!contact) {
            reject('There was an error!!!');
        }
        resolve(store.add(contact))
    })
}

module.exports = {
    list: getAll,
    add: addContact,
}