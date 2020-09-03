const store = require('./store');


function getAll(idUser) {
    return store.get(idUser)
}

function addContact(contact) {
    return new Promise((resolve, reject) => {
        if (!contact) {
            reject('There was an error!!!');
        }
        resolve(store.add(contact))
    })
}

function updateContact(id,data){
    return new Promise((resolve,reject)=>{
        if(!data){
            reject('There was an error!!!');
        }
        resolve(store.update(id,data));
    })
}
function deleteContact(id){
    return new Promise((resolve,reject)=>{
        if(!id){
            reject('There was an error!!!');
        }
        resolve(store.delete(id));
    })
}

module.exports = {
    list: getAll,
    add: addContact,
    update: updateContact,
    delete: deleteContact,
}