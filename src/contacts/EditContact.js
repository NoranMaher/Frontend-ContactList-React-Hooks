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
  const [isEmailValid, setIsEmailValid] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState("");
  const [isNameValid, setIsNameValid] = useState("");
  const history = useHistory();
  const currentContactId = props.match.params.id;

  const validateName = (e) => {
    const nameRex = /^[a-zA-Z ]{2,30}$/;
    if (nameRex.test(e.target.value)) {
      setIsNameValid("pass");
    } else {
      setIsNameValid("fail");
    }
  };

  const validateEmail = (e) => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(e.target.value)) {
      setIsEmailValid("pass");
    } else {
      setIsEmailValid("fail");
    }
  };
  const validatePhone = (e) => {
    const phoneRex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (phoneRex.test(e.target.value)) {
      setIsPhoneValid("pass");
    } else {
      setIsPhoneValid("fail");
    }
  };

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
    if (e.target.name == "fullName") {
      validateName(e);
    }
    if (e.target.name == "emailAddress") {
      validateEmail(e);
    }
    if (e.target.name == "phoneNumber") {
      validatePhone(e);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      isEmailValid !== "fail" &&
      isPhoneValid !== "fail" &&
      isNameValid !== "fail"
    ) {
      editContact(selectedContact);
      history.push("/");
    }
  };
  return (
    <>
      <Title content="Edit Contact" />
      <Form className="editForm" onSubmit={onSubmit}>
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
          {isNameValid == "fail" && (
            <span className="errorMsg">Please enter your name correctly</span>
          )}
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
          {isEmailValid == "fail" && (
            <span className="errorMsg">Please enter email correctyl</span>
          )}
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
          {isPhoneValid == "fail" && (
            <span className="errorMsg">
              Please enter phone number correctyl
            </span>
          )}
        </FormGroup>
        <div className="btnGroup">
          <Button className="greyBtn" outline type="submit">
            Save Contact
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditContact;
