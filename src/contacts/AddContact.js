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
  const [isEmailValid, setIsEmailValid] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState("");
  const [isNameValid, setIsNameValid] = useState("");
  const { addContact } = useContext(GlobalContext);
  const history = useHistory();

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

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      isEmailValid !== "fail" &&
      isPhoneValid !== "fail" &&
      isNameValid !== "fail"
    ) {
      const newContact = {
        id: uuid(),
        fullName,
        emailAddress,
        phoneNumber,
      };
      addContact(newContact);
      history.push("/");
    }
  };

  const onChangeName = (e) => {
    validateName(e);
    setFullName(e.target.value);
  };
  const onChangePhone = (e) => {
    validatePhone(e);
    setPhoneNumber(e.target.value);
  };
  const onChangeEmail = (e) => {
    validateEmail(e);
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
          {isNameValid == "fail" && (
            <span className="errorMsg">Please enter your name correctly</span>
          )}
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
          {isEmailValid == "fail" && (
            <span className="errorMsg">Please enter the email correctly</span>
          )}
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
          {isPhoneValid == "fail" && (
            <span className="errorMsg">
              Please enter the phone number correctly
            </span>
          )}
        </FormGroup>
        <div className="btnWrapper">
          <Button outline type="submit">
            Add Contact
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddContact;
