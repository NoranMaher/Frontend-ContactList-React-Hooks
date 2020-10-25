import React, { useEffect, useState, useContext } from "react";

import Title from "../components/Title";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const EditContact = (props) => {
  const { contacts, editContact } = useContext(GlobalContext);
  const [selectedContact, setSelectedContact] = useState({
    id: "",
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
  });
  const history = useHistory();
  const currentContactId = props.match.params.id;

  useEffect(() => {
    const contactId = currentContactId;
    if (!contacts) return;
    let contactList = contacts;
    const selectedContact = contactList.find(
      (contact) => contact.id === contactId
    );
    setSelectedContact(selectedContact);
  }, [currentContactId, contacts]);

  const onChange = (e) => {
    setSelectedContact({ ...selectedContact, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    console.log(selectedContact);
    e.preventDefault();
    editContact(selectedContact);
    history.push("/");
  };
  return (
    <>
      <Title content="Edit Contact" />
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            value={selectedContact.fullName}
            onChange={onChange}
            name="fullName"
            placeholder="Enter contact"
            required
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>Email Address</Label>
          <Input
            type="email"
            value={selectedContact.emailAddress}
            onChange={onChange}
            name="emailAddress"
            placeholder="Enter email"
            required
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>Phone Number</Label>
          <Input
            type="tel"
            value={selectedContact.phoneNumber}
            onChange={onChange}
            name="phoneNumber"
            placeholder="Enter phone"
            required
          ></Input>
        </FormGroup>
        <Button type="submit">Edit Contact</Button>
      </Form>
    </>
  );
};

export default EditContact;
