import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Title from "../components/Title";
import { GlobalContext } from "../context/GlobalState";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { v4 as uuid } from "uuid";

const AddContact = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const { addContact } = useContext(GlobalContext);
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      id: uuid(),
      fullName,
      emailAddress,
      phoneNumber,
    };
    addContact(newContact);
    history.push("/");
  };

  const onChangeName = (e) => {
    setFullName(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhoneNumber(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmailAddress(e.target.value);
  };

  return (
    <>
      <Title content="Add Contact" />
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            value={fullName}
            onChange={onChangeName}
            name="name"
            placeholder="Enter Name"
            required
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>Email Address</Label>
          <Input
            type="email"
            value={emailAddress}
            onChange={onChangeEmail}
            name="email"
            placeholder="Enter Email"
            required
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>Phone Number</Label>
          <Input
            type="tel"
            value={phoneNumber}
            onChange={onChangePhone}
            name="phone"
            placeholder="Enter Phone"
            required
          ></Input>
        </FormGroup>
        <Button type="submit">Add Contact</Button>
      </Form>
    </>
  );
};

export default AddContact;
