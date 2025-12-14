import express from "express";
import { formatContactList, loadContacts } from "../services.js";

const contactList = [];
const router = express.Router();

router.get("/list", (req, res) => {
  if (req.query.format) {
    const responseData = `<pre>${formatContactList(contactList)}</pre>`;

    res.type("html");
    res.send(responseData);
  }
  res.json(contactList);
});
const loadedContacts = await loadContacts();
contactList.push(...loadedContacts);

export default router;
