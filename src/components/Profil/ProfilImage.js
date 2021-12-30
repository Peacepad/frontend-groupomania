import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "evergreen-ui";
import { useForm } from "react-hook-form";
import axios from "axios";

const ProfilImage = () => {
  const token = localStorage.getItem("token");
  const userData = useSelector((state) => state.userReducer);

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
        url:`http://localhost:8000/api/user/${userData[0].user_id}`,
        headers: {
            "Content-Type": "multipart/form-data",
            authorization: "Bearer " + token,
          },
        data: formData,
      })
      .then((res) => {console.log(res);
        })
      .catch((err) => {console.log(err)})
   
  };

  return (
    <div className="profil-avatar">
      <Avatar
        className="profil-avatar__withoutUrl"
        name={userData[0].firstname + " " + userData[0].lastname}
        size={200}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("image")}
                onChange={onSelectFile} />
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default ProfilImage;
