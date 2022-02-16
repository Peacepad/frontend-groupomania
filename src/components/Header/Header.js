import React, { useEffect, useState, useRef } from "react";
import Navigation from "./Navigation";
import { Avatar } from "evergreen-ui";
import { Link } from "react-router-dom";
import MoreHeader from "./MoreHeader";


const Header = ({setPlayOnce}) => {
  const token = localStorage.getItem("token");
  

  //Verification de la connexion
  const [isLogged, setIsLogged] = useState();

  const verifyToken = () => {
    if (!token) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  };

  useEffect(() => {
    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    
    if (userData.userImageURL !== null) {
      logDiv = (
        <div className="header-user">
          <nav className="header-avatar__container" role="button" onClick={() => setIsMenuOpen((oldState) => !oldState)} tabIndex="2" aria-label="Menu utilisateur" >
            {localStorage.getItem("userData") && (
              <img
                src={userData.userImageURL}
                alt="Votre image de profil"
                
              />
            )}
            {isMenuOpen && <MoreHeader setPlayOnce={setPlayOnce}/>}
          </nav>
        </div>
      );
    } else {
      logDiv = (
        <div className="header-user">
          <nav className="header-avatar__container"  onClick={() => setIsMenuOpen((oldState) => !oldState)} tabIndex="2" aria-label="Menu utilisateur" >
            {localStorage.getItem("userData") && (
              <Avatar
                className="header-avatar"
                name={userData.userFirstname + " " + userData.userLastname}
                size={60}
                
              />
            )}
            {isMenuOpen && <MoreHeader setPlayOnce={setPlayOnce}/>}
          </nav>
        </div>
      );
    }
  } else if(isLogged === undefined) {
    // Evite d'afficher else le temps d'un instant
  }
  else {
    logDiv = <Navigation />;
  }

  return (
    <header>
      <Link to="/" aria-label="Aller à l'accueil" tabIndex="1">
        <img src="../../img/logo.png" alt="logo groupomania" />
      </Link>
      {logDiv}
    </header>
  );
};

export default Header;
