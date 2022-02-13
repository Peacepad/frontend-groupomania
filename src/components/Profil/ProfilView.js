import React from "react";
import { useForm } from "react-hook-form";
import ProfilImage from "./ProfilImage";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ProfilView = () => {
  const history = useHistory();

  const token = localStorage.getItem("token");

  const userData = JSON.parse(localStorage.getItem("userData"));
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    let formData = new FormData(); //formdata object

    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);

    axios({
      method: "PUT",
      url: `http://localhost:8000/api/user/${userData.userId}`,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: "Bearer " + token,
      },
      data: formData,
    })
      .then((res) => {
        let userData = JSON.parse(localStorage.getItem("userData"));
        userData.userFirstname = res.data.userFirstname;
        userData.userLastname = res.data.userLastname;
        userData.userEmail = res.data.userEmail;
        localStorage.setItem("userData", JSON.stringify(userData));
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = (data) => {
    axios({
      method: "delete",
      url: `http://localhost:8000/api/user/${userData.userId}`,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: "Bearer " + token,
      },
    })
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        history.push("/login");
      })
      .catch(console.log("erreur"));
  };

  return (
    <div>
      <ProfilImage />
      <div className="profil-info">
        <h2>Vos informations</h2>
        <form className="profil-edit" onSubmit={handleSubmit(onSubmit)}>
          <div className="profil-edit__label">
            <label>
              Prénom :{" "}
              <input
                type="text"
                defaultValue={userData.userFirstname}
                {...register("firstname")}
              />
            </label>
            <label>
              Nom :{" "}
              <input
                type="text"
                defaultValue={userData.userLastname}
                {...register("lastname")}
              />
            </label>

            <label>
              Email :{" "}
              <input
                type="text"
                defaultValue={userData.userEmail}
                {...register("email")}
              />
            </label>
          </div>

          <input
            type="submit"
            className="profil-submit"
            value="Modifier"
          ></input>
        </form>
      </div>

      <form id="profil-delete" onSubmit={handleSubmit(deleteUser)}>
        <input
          type="submit"
          value="Supprimer le compte"
          className="profil-delete__button"
        ></input>
      </form>
    </div>
  );
};

export default ProfilView;
