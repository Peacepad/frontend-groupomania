import React, { useEffect, useState, useRef } from "react";
import Navigation from "./Navigation";
import { Avatar } from "evergreen-ui";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MoreHeader from "./MoreHeader";

const Header = () => {
  const token = localStorage.getItem("token");
  const userData = useSelector((state) => state.userReducer);

  //Verification de la connexion
  const [isLogged, setIsLogged] = useState();

  const verifyToken = async () => {
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  };

  useEffect(() => {
    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  let logDiv;

  // Afficher le menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Click en dehors du menu
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  //Affichage différent en fonction de la connexion
  if (isLogged) {
    logDiv = (
      <div className="header-user">
        <ul>
          <li className="header-avatar__container" ref={ref}>
            {userData[0] && (
              <Avatar
                className="header-avatar"
                name={userData[0].firstname + " " + userData[0].lastname}
                size={60}
                onClick={() => setIsMenuOpen((oldState) => !oldState)}
              />
            )}
            {isMenuOpen && <MoreHeader />}
          </li>
          <li></li>
        </ul>
      </div>
    );
  } else {
    logDiv = <Navigation />;
  }

  return (
    <header>
      <Link to="/">
        <img src="./img/logo.png" alt="logo groupomania" />
      </Link>
      {logDiv}
    </header>
  );
};

export default Header;
