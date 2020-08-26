const ModelCont = require('../../../Models/contact');


async function getAll(){
    let contacts = await ModelCont.find();
    return contacts;
}
/*async function getContact(contactId){
    
}*/



module.exports = {
    get: getAll,
}
