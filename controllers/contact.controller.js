// In this file, we simply need to add contact information from the user
const Contact = require("../models/contact.model.js");

exports.addContact = async function (contact) {
  // Create and Save contact information
  let contactModel = new Contact({
    name: contact.name,
    surname: contact.surname,
    email: contact.email,
    phone: contact.phone,
    additionalInfo: contact.additionalInfo,
  });
  try {
    const newContact = await contactModel.save();
    return true;
  } catch (error) {
    return false;
  }
};
