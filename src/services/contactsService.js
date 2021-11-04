const Repository = require("../repositories");
const contactRepository = new Repository();
const entity = "Contacts";

exports.getContacts = async () => {
    return contactRepository.findAll(entity);
}