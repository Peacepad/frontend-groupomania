import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "evergreen-ui";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");
  const userData = useSelector((state) => state.userReducer);

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
  }, [userData]);

  let logDiv;

  if (isLogged) {
    logDiv = (
      <div className="header-user">
        <ul>
          <li>
            {userData[0] && (
              <Avatar
                name={userData[0].firstname + " " + userData[0].lastname}
                size={60}
              />
              
            )}
            <div className="more"></div>
          </li>
          <li>
            <Link to="/login" onClick={() => signOut()}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Link>
          </li>
        </ul>
      </div>
    );
  } else {
    logDiv = <Navigation />;
  }

  const signOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <header>
      <img src="./img/logo.png" alt="logo groupomania" />

      {logDiv}
    </header>
  );
};

export default Header;
