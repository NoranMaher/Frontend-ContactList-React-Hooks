import React from "react";
import Header from "./components/Header";
import Home from "./contacts/Home";
import ContactDetails from "./contacts/ContactDetails";
import AddContact from "./contacts/AddContact";
import EditContact from "./contacts/EditContact";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";

const App = () => {
  return (
    <div className="container-fluid">
      <GlobalProvider>
        <Header />

        <Router>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/add" exact component={AddContact}></Route>
            <Route path="/:id" exact component={ContactDetails}></Route>
            <Route path="/edit/:id" exact component={EditContact}></Route>
          </Switch>
        </Router>
      </GlobalProvider>
    </div>
  );
};
export default App;
