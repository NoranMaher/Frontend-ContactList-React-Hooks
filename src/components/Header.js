import React, { useContext } from "react";
import Logo from "../imgs/vodafone_logo.svg";
import { GlobalContext } from "../context/GlobalState";
import { Link, useHistory } from "react-router-dom";
const Header = () => {
  const { setSearch, search, searchContacts } = useContext(GlobalContext);
  const [returnedContacts, setReturnedContacts] = React.useState([]);
  const history = useHistory();
  const handleSearchSubmit = (e) => {
    if (search == "") return;
    e.preventDefault();
    searchContacts(search);
    history.push("/");
  };

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="navbar-brand m-xs-auto">
          <img
            className="navbar"
            src={Logo}
            alt="Vodafone Logo"
            loading="lazy"
          />
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="navbar-form form-inline d-sm-block d-none"
        >
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </nav>
    </header>
  );
};
export default Header;
