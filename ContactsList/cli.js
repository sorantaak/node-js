import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import fs from "fs/promises";
import {
  loadContacts,
  CONTACT_LIST_FILE_PATH,
  formatContactList,
} from "./services.js";

const rl = readline.createInterface({ input, output });

const contactList = [];

console.log("------ Contact List -------");

async function saveContacts() {
  try {
    const contactListJSON = JSON.stringify(contactList);
    await fs.writeFile(CONTACT_LIST_FILE_PATH, contactListJSON);
  } catch (error) {
    throw error;
  }
}

async function addNewContact() {
  const firstName = await rl.question("First Name: ");
  const lastName = await rl.question("Last Name: ");

  const lastContact = contactList[contactList.length - 1];

  const id = contactList.length ? lastContact.id + 1 : 0;
  const newContact = {
    id,
    firstName,
    lastName,
  };
  contactList.push(newContact);
  saveContacts();
}

async function deleteContact() {
  if (contactList.length < 1) {
    console.error("This is no contact on the list");
    return;
  }
  showContactList();

  const contactId = await rl.question("delete id:");
  const contactIndex = contactList.findIndex(
    ({ id }) => id === Number(contactId)
  );

  if (contactId < 0) {
    console.error("Invalid Id");
    return;
  }
  contactList.splice(contactIndex, 1);
  saveContacts();
}

function showContactList() {
  const foramttedContactList = formatContactList(contactList);

  console.log(foramttedContactList);
}
function quit() {
  rl.close();
}
async function help() {
  console.log(
    "n: Add New Contact\nl:show contact list\nd:delete contact\nq: quit"
  );
  const action = await rl.question("Enter Your action:");
  if (action === "n") {
    await addNewContact();
  } else if (action === "l") {
    showContactList();
  } else if (action === "d") {
    await deleteContact();
  } else {
    quit();
    return;
  }
  help();
  // console.log({ action });
}

// await addNewContact();
// showContactList();
// quit();
async function main() {
  const loadedContacts = await loadContacts();
  contactList.push(...loadedContacts);
  help();
}

await main();
