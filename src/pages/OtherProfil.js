import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { Avatar } from "evergreen-ui";
import { Link, useHistory } from "react-router-dom";


const OtherProfil = () => {
  const params = new URL(document.location).searchParams;
  const justId = params.get("id");
  const token = localStorage.getItem("token");
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


    const compareId = async () => {
        if (dataProfil[0]) {
          if (dataProfil[0].user_id == userData.userId) {
            history.push("/profil");
          }
        }
      };
    
      compareId();
  }, [playOnce]);



  return (
    <div>
      <Header />

      {dataProfil[0] !== undefined && (
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
          <div className="other-info">
            <p>{dataProfil[0].firstname + " " + dataProfil[0].lastname}</p>
          </div>
        </main>
      )}
    </div>
  );
};

export default OtherProfil;
