const ModelCont = require('../../../Models/contact');


async function getAll(userId){
    let filter = {userId: userId}
    let contacts = await ModelCont.find(filter)
        .populate('users')
        .exec()
    return contacts;
}
 function addContact(contact){
    let newContact = new ModelCont(contact);
    newContact.save();
    return newContact;
}
async function updateContact(id,data){
    try{
        let contact = await ModelCont.findById(id)
        if(!contact){
            throw new Error('the contact does not exist');
        }else{
            contact.set(data)
            let result = await contact.save();
            return result;
        }
        
    }catch(err){
        throw new Error(err);
    }
}

 function deleteContact(id){
    return ModelCont.deleteOne({_id: id});
}   


module.exports = {
    get: getAll,
    add: addContact,
    update: updateContact,
    delete: deleteContact,
}
