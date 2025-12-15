import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

import {
  loadContacts,
  formatContactList,
  generateNewContactId,
  saveContacts,
} from "./services.js";

const rl = readline.createInterface({ input, output });

const contactList = [];

console.log("------ Contact List -------");

async function createNewContact() {
  const firstName = await rl.question("First Name: ");
  const lastName = await rl.question("Last Name: ");

  const id = generateNewContactId(contactList);

  const newContact = {
    id,
    firstName,
    lastName,
  };
  contactList.push(newContact);
  saveContacts(contactList);
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
  saveContacts(contactList);
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
    await createNewContact();
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
