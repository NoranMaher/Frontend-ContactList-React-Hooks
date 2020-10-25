import React, { useContext } from "react";
import Logo from "../imgs/vodafone_logo.svg";
import { GlobalContext } from "../context/GlobalState";

const Header = () => {
  const { setSearch } = useContext(GlobalContext);

  return (
    <header>
      <nav className="navbar">
        <a className="navbar-brand">
          <img
            className="navbar"
            src={Logo}
            alt="Vodafone Logo"
            loading="lazy"
          />
        </a>
        <form className="navbar-form form-inline">
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
