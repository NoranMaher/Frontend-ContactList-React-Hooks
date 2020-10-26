import React from "react";
import Header from "./components/Header";
import ConctactList from "./contacts/ContactsList";
import ContactDetails from "./contacts/ContactDetails";
import AddContact from "./contacts/AddContact";
import EditContact from "./contacts/EditContact";
import Copyrights from "./components/Copyrights";
import FloatingBtn from "./components/FloatingBtn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";

const App = () => {
  return (
    <div className="container appWrapper">
      <GlobalProvider>
        <Router>
          <Header />
          <FloatingBtn />
          <Switch>
            <Route path="/" exact component={ConctactList}></Route>
            <Route path="/add" exact component={AddContact}></Route>
            <Route path="/:id" exact component={ContactDetails}></Route>
            <Route path="/edit/:id" exact component={EditContact}></Route>
          </Switch>
        </Router>
        <Copyrights />
      </GlobalProvider>
    </div>
  );
};
export default App;
