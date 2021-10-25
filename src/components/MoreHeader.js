import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MoreHeader = () => {

  // Déconnection
  const signOut = () => {
    localStorage.removeItem("token");
  };



  return <><div className="header-more">
  <ul>
    <li>Afficher le profil</li> 
    
    <Link to="/login" onClick={() => signOut()}>
            <li>Se déconnecter</li>
            </Link>
  </ul>
</div></>;
};

export default MoreHeader;
