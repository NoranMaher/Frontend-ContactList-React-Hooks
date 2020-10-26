import React, { useEffect, useState, useContext } from "react";
import Card from "../components/Card";
import { GlobalContext } from "../context/GlobalState";

const ContactList = () => {
  /* state declaration */
  const [uniqueLetters, setUniqueLetters] = useState([]);
  const [fetchedContacts, setFetchedContacts] = useState([]);
  /* call functions and contacts list from global context */
  const { contacts, search } = useContext(GlobalContext);

  useEffect(() => {
    if (!contacts) return;
    const contactList = contacts;
    setFetchedContacts(
      contactList
    ); /* add fetched contacts from global context to local state to manibulate it */
    setUniqueLetters(
      Array.from(
        new Set(contacts.map((name) => name.fullName.charAt(0).toLowerCase()))
      ).sort()
    ); /* extract unique letters from contacts */
  }, [contacts]);

  useEffect(() => {
    if (!contacts) return;
    let contactList = contacts;
    let selectedContacts = contactList.filter(function (contactItem) {
      return contactItem.fullName.toLowerCase().includes(search.toLowerCase());
    }); /* handle on typing search field to return the contacts whti matching full name */
    setFetchedContacts(selectedContacts);
  }, [search]);

  /* hanfle click on unique letters to return the contacts contains with that letters */
  const handleFilter = (event) => {
    const selectedLetter = event.currentTarget.innerText.toLowerCase();
    var selectedContacts = contacts.filter(function (contactItem) {
      return contactItem.fullName.charAt(0).toLowerCase() == selectedLetter;
    });
    setFetchedContacts(selectedContacts);
  };

  return (
    <div className="contact-list">
      <ul className="filter-list">
        {contacts
          ? uniqueLetters.map((letter, i) => (
              <li key={i} onClick={handleFilter}>
                {letter}
              </li>
            ))
          : "Loading"}
      </ul>
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3">
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
    </div>
  );
};

export default ContactList;
