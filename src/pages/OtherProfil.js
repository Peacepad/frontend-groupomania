import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { Avatar } from "evergreen-ui";
import { useHistory } from "react-router-dom";
import ProfilImage from "../components/Profil/ProfilImage";
import ProfilView from "../components/Profil/ProfilView";

const OtherProfil = () => {
  const params = new URL(document.location).searchParams;
  const justId = params.get("id");
  
  const [dataProfil, setDataProfil] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);

  const userData = JSON.parse(localStorage.getItem("userData"));

  const history = useHistory();

  useEffect(() => {
    const searchUserInfo = () => {
      if (playOnce) {
        axios.get(`http://localhost:8000/api/user/${justId}`).then((res) => {
          setDataProfil(res.data);
          setPlayOnce(false);
          console.log(res.data);
        });
      }
    };
    searchUserInfo();
  }, [playOnce]);

  return (
    <div>
      <Header />

      {dataProfil[0] !== undefined &&
        dataProfil[0].user_id == userData.userId && <ProfilImage />}

      {dataProfil[0] !== undefined && dataProfil[0].user_id != userData.userId && (
        <main className="other-profil__container">
          <div className="other-profil__avatar">
            {dataProfil[0].user_imageUrl ? (
              <img src={dataProfil[0].user_imageUrl} alt="Avatar" />
            ) : (
              <div className="other-avatar">
                <Avatar
                  className="profil-avatar__withoutUrl"
                  name={dataProfil[0].firstname + " " + dataProfil[0].lastname}
                  size={200}
                />
              </div>
            )}
          </div>
          
        </main>
      )}
      {dataProfil[0] !== undefined &&
        dataProfil[0].user_id == userData.userId && <ProfilView/>}

    {dataProfil[0] !== undefined && dataProfil[0].user_id != userData.userId && (
      <div className="profil-info">
        <h2>Informations</h2>
        <div>Prénom: {dataProfil[0].firstname}</div>
        <div>Nom: {dataProfil[0].lastname}</div>
        <div>Email: {dataProfil[0].email}</div>
      </div>
    )}



    </div>
  );
};

export default OtherProfil;
