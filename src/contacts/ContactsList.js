import React, { useEffect, useState, useContext } from "react";
import Card from "../components/Card";
// import { ContactsContext } from "../context/index";
import { GlobalContext } from "../context/GlobalState";

const ContactList = () => {
  const [uniqueLetters, setUniqueLetters] = useState([]);
  const [fetchedContacts, setFetchedContacts] = useState([]);
  const { contacts, search } = useContext(GlobalContext);

  useEffect(() => {
    if (!contacts) return;

    const contactList = contacts;
    setFetchedContacts(contactList);

    setUniqueLetters(
      Array.from(new Set(contacts.map((name) => name.fullName.charAt(0))))
    );
  }, [contacts]);

  useEffect(() => {
    if (!contacts) return;
    let contactList = contacts;
    let selectedContacts = contactList.filter(function (contactItem) {
      return contactItem.fullName.toLowerCase().includes(search);
    });
    setFetchedContacts(selectedContacts);
  }, [search]);

  const handleFilter = (event) => {
    const selectedLetter = event.currentTarget.innerText;
    var selectedContacts = contacts.filter(function (contactItem) {
      return contactItem.fullName.charAt(0) == selectedLetter;
    });
    setFetchedContacts(selectedContacts);
  };

  return (
    <div className="contact-list">
      <ul>
        {contacts
          ? uniqueLetters.map((letter, i) => (
              <li key={i} onClick={handleFilter}>
                {letter}
              </li>
            ))
          : "Loading"}
      </ul>
      <div className="list-wrapper">
        {fetchedContacts
          ? fetchedContacts.map((contactItem, i) => (
              <Card
                key={i}
                userId={contactItem.id}
                name={contactItem.fullName}
                email={contactItem.emailAddress}
                phone={contactItem.phoneNumber}
              ></Card>
            ))
          : "Loading"}
      </div>
    </div>
  );
};

export default ContactList;
