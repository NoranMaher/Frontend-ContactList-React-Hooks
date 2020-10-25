export default (state, action) => {
  switch (action.type) {
    case "GET_CONTACTS":
      return {
        ...state,
        contacts: action.payload,
      };
    case "REMOVE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((contact) => {
          return contact.id !== action.payload;
        }),
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
      };
    case "EDIT_CONTACT":
      const pyaloadContact = action.payload;
      const updateContacts = state.contacts.map((contact) => {
        if (contact.id === pyaloadContact.id) {
          return pyaloadContact;
        }
        return contact;
      });
      return {
        ...state,
        contacts: updateContacts,
      };

    default:
      return state;
  }
};
