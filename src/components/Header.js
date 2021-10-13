import React from 'react';
import Navigation from './Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from 'evergreen-ui'

const Header = () => {
   

      const userId = localStorage.getItem("userId");

      

    return (
        <header>
            <img src="./img/logo.png" alt ="logo groupomania" />

            {!userId && (
            <Navigation/>
          )}
            {userId && (
                <div className="header-user">
                    <ul>
                        <li><Avatar name="Clément La" size={40} /></li>
                        <li><FontAwesomeIcon icon={faSignOutAlt} /></li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;