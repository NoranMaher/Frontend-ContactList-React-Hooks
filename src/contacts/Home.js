import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import ContactList from "../contacts/ContactsList";
import FloatingBtn from "../components/FloatingBtn";
const Home = () => {
  return (
    <>
      <FloatingBtn />
      <Title content="Contacts" />
      <ContactList />
    </>
  );
};

export default Home;
