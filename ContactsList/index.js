import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

const contactList = [];

console.log("------ Contact List -------");

async function addNewContact() {
  const firstName = await rl.question("First Name: ");
  const lastName = await rl.question("Last Name: ");

  const newContact = {
    id: contactList.length,
    firstName,
    lastName,
  };
  contactList.push(newContact);
}
function showContactList() {
  const foramttedContactList = contactList
    .map(({ id, firstName, lastName }) => `#${id} ${firstName} ${lastName}`)
    .join("\n");

  console.log(foramttedContactList);
}
function quit() {
  rl.close();
}
async function help() {
  console.log("n: Add New Contact\nl:show contact list\nq: quit");
  const action = await rl.question("Enter Your action:");
  if (action === "n") {
    await addNewContact();
  } else if (action === "l") {
    showContactList();
  } else {
    quit();
    return;
  }
  help();
  console.log({ action });
}

// await addNewContact();
// showContactList();
// quit();
await help();
