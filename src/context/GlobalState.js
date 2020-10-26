import React, { createContext, useReducer, useEffect, useState } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
  contacts: [],
};

export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [search, setSearch] = useState("");
  // Actions

  useEffect(() => {
    setSearch(search);
  }, [search]);

  const getContacts = (contacts) => {
    dispatch({
      type: "GET_CONTACTS",
      payload: contacts,
    });
  };
  const searchContacts = (search) => {
    dispatch({
      type: "SEARCH_CONTACTS",
      payload: search,
    });
  };
  const removeContact = (id) => {
    dispatch({
      type: "REMOVE_CONTACT",
      payload: id,
    });
  };

  const addContact = (contact) => {
    dispatch({
      type: "ADD_CONTACT",
      payload: contact,
    });
  };

  const editContact = (contact) => {
    dispatch({
      type: "EDIT_CONTACT",
      payload: contact,
    });
  };

  useEffect(() => {
    axios
      .get("/contacts.json")
      .then((response) => {
        const { data } = response.data;
        getContacts(data);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        contacts: state.contacts,
        search,
        setSearch,
        searchContacts,
        removeContact,
        addContact,
        editContact,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
