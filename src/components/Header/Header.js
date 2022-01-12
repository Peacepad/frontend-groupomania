import React, { useEffect, useState, useRef } from "react";
import Navigation from "./Navigation";
import { Avatar } from "evergreen-ui";

import { Link } from "react-router-dom";
import MoreHeader from "./MoreHeader";

const Header = () => {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));


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
  },[]);

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
    let userData = JSON.parse(localStorage.getItem("userData"));
    if(userData.userImageURL != undefined) {
      logDiv = (
        <div className="header-user">
          <ul>
            <li className="header-avatar__container" ref={ref}>
              {localStorage.getItem("userData") && (
                <img src={userData.userImageURL} alt="Votre image de profil" onClick={() => setIsMenuOpen((oldState) => !oldState)}/>
              )}
              {isMenuOpen && <MoreHeader />}
            </li>
            <li></li>
          </ul>
        </div>
      );
    }
    else {logDiv = (
      <div className="header-user">
        <ul>
          <li className="header-avatar__container" ref={ref}>
            {localStorage.getItem("userData") && (
              <Avatar
                className="header-avatar"
                name={userData.userFirstname + " " + userData.userLastname}
                size={60}
                onClick={() => setIsMenuOpen((oldState) => !oldState)}
              />
            )}
            {isMenuOpen && <MoreHeader />}
          </li>
          <li></li>
        </ul>
      </div>
    );}
    
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
