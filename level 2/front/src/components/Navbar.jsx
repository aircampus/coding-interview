import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [navOpen, setnavOpen] = useState("bx bx-menu");
  const [open, setOpen] = useState("sidebar");

  function menuBtnChange() {
    setnavOpen((prevNavOpen) =>
      prevNavOpen === "bx bx-menu" ? "bx-menu-alt-right" : "bx bx-menu"
    );

    setOpen((prevOpen) =>
      prevOpen === "sidebar" ? "sidebar open" : "sidebar"
    );
  }

  return (
    <div className="App">
      <div className={open}>
        <div className="logo-details">
          <div className="logo_name">
            STOLEN BIKE
            <br />
            <span className="logo-title">
              Retrouvez votre vélo en un click !
            </span>
          </div>
          <i
            className={navOpen}
            id="btn"
            onClick={menuBtnChange}
            aria-hidden="true"
          />
        </div>
        <ul className="nav-list">
          <li>
            <Link to="/">
              <i className="bx bx-grid-alt" />
              <span className="links_name">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/report">
              <i className="bx bx-cycling"></i>
              <span className="links_name">Signaler un vol</span>
            </Link>
          </li>
          <li>
            <Link to="/officer">
              <i class="bx bx-folder-open"></i>
              <span className="links_name">Enquêtes</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
