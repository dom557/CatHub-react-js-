import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav>
      <div className="navbar-container">
        <Link className="navbar-link" to={"/"}>
          <h3 className="navbar-title">
            <span className="material-symbols-outlined navbar-title-icon">
              pets
            </span>
            <div className="navbar-title-text">CatHub</div>
          </h3>
        </Link>

        <div className="navbar-right-part">
          <div className="navbar-links">
            <Link className="navbar-link" to={"/favorites"}>
              <span class="material-symbols-outlined navbar-icons">
                favorite
              </span>
              <div className="navbar-option">Favorites</div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};