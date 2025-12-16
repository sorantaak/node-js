import fs from "fs/promises";
const CONTACT_LIST_FILE_PATH = "./data/contacts-list.json";
export async function loadContacts() {
  try {
    const contactListJSON = await fs.readFile(CONTACT_LIST_FILE_PATH, "utf-8");
    return JSON.parse(contactListJSON);
  } catch (error) {
    throw error;
  }
}

export async function saveContacts(contactList) {
  try {
    const contactListJSON = JSON.stringify(contactList);
    await fs.writeFile(CONTACT_LIST_FILE_PATH, contactListJSON);
  } catch (error) {
    throw error;
  }
}

export function formatContactList(contactList) {
  return contactList
    .map(
      ({ id, first_name, last_name, is_favorite }) =>
        `${is_favorite ? "*" : "#"}${id} ${first_name} ${last_name}`
    )
    .join("\n");
}

export function generateNewContactId(contactList) {
  const lastContact = contactList[contactList.length - 1];

  const id = contactList.length ? lastContact.id + 1 : 0;
  return id;
}
