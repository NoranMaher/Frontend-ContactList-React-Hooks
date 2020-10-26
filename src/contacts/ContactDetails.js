import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const ContactDetails = (props) => {
  const { contacts, removeContact } = useContext(GlobalContext);
  const [selectedContact, setSelectedContact] = useState({
    id: "",
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
  });
  const history = useHistory();
  const currentContactId = props.match.params.id;
  const handleRemoveContact = () => {
    removeContact(currentContactId);
    history.push("/");
  };
  useEffect(() => {
    if (!contacts) return;
    let contactList = contacts;
    const contactId = currentContactId;
    const selectedContact = contactList.find(
      (contact) => contact.id === contactId
    );
    setSelectedContact(selectedContact);
  }, [currentContactId, contacts]);
  return (
    <>
      <Title content={`${selectedContact.fullName}'s Profile`} />
      <ListGroup className="profileList">
        <ListGroupItem>
          <span>Name:</span>
          <span>{selectedContact.fullName}</span>
        </ListGroupItem>
        <ListGroupItem className="redText">
          <span>E-mail:</span>
          <span>{selectedContact.emailAddress}</span>
        </ListGroupItem>
        <ListGroupItem className="redText">
          <span>Phone:</span>
          <span>{selectedContact.phoneNumber}</span>
        </ListGroupItem>
      </ListGroup>
      <div className="btnGroup">
        <Button className="redBtn" onClick={handleRemoveContact}>
          Delete
        </Button>

        <Link className="greyBtn" to={`/edit/${currentContactId}`}>
          Edit
        </Link>
      </div>
    </>
  );
};

export default ContactDetails;
