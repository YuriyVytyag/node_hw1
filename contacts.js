const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateFile = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const newContacts = contacts.filter(({ id }) => id !== contactId);

  await updateFile(newContacts);
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: `${contacts.length + 1}`,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateFile(contacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
