import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ProfilImage from "./ProfilImage";
import axios from "axios";

const ProfilView = () => {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  const userData = JSON.parse(localStorage.getItem("userData"));
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
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
        let userData= JSON.parse(localStorage.getItem("userData"));
        userData.userFirstname = res.data.userFirstname;
        userData.userLastname = res.data.userLastname;
        userData.userEmail = res.data.userEmail;
        localStorage.setItem("userData", JSON.stringify(userData));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <ProfilImage />
      <div className="profil-info">
        <h2>Vos informations</h2>
        <form className="profil-edit" onSubmit={handleSubmit(onSubmit)}>
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

          <input type="submit" value="Modifier"></input>
        </form>
      </div>
    </div>
  );
};

export default ProfilView;
