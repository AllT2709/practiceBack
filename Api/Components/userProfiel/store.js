const ModelCont = require('../../../Models/contact');


async function getAll(){
    let contacts = await ModelCont.find()
        .populate('users');
    return contacts;
}
 function addContact(contact){
    let newContact = new ModelCont(contact);
    newContact.save();
    return newContact;
}



module.exports = {
    get: getAll,
    add: addContact,
}
