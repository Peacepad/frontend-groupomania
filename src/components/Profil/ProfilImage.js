import React, { useEffect, useState, useRef } from "react";
import { Avatar } from "evergreen-ui";
import { useForm } from "react-hook-form";
import axios from "axios";

const ProfilImage = () => {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));

  const { register, handleSubmit, reset } = useForm();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const onSubmit = async (event) => {
    let formData = new FormData(); //formdata object

    formData.append("image", selectedFile);

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
        userData.userImageURL = res.data.userImageURL;
        localStorage.setItem("userData", JSON.stringify(userData));
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let profilAvatar;
  
  profilAvatar = (
    <Avatar
      className="profil-avatar__withoutUrl"
      name={userData.userFirstname + " " + userData.userLastname}
      size={200}
    />
  );
  if (userData.userImageURL) {
    profilAvatar = <img src={userData.userImageURL} alt="votre avatar" />;
  }
  if (userData.imageURL != undefined) {
    profilAvatar = <img src={userData.imageURL} alt="votre avatar" />;
  }
  if (preview) {
    profilAvatar = <img src={preview} alt="Aperçu du fichier" />;
  }

  return (
    <div className="profil-avatar">
      <div className="profil-avatar__preview ">{profilAvatar}</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("image")} onChange={onSelectFile} />
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default ProfilImage;
