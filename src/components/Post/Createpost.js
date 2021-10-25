import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Createpost = () => {

  const postData = useSelector((state) => state.postReducer);


   // -------------- Afficher l'image choisie
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
   // ------------

  const {register, handleSubmit, reset} = useForm();

  const onSubmit = async (data) => {

    const token = localStorage.getItem("token");

    let formData = new FormData();    //formdata object


    formData.append('userId', token);
    formData.append('text', data.text);
    formData.append('image', selectedFile);

    

    
axios({
  method: "post",
  url: "http://localhost:8000/api/post/create",
  data: formData,
    headers: { "Content-Type": "multipart/form-data",
  'authorization': 'Bearer ' + token,
 },
})
  .then(function (response) {
    
    console.log(response);
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });

  reset();
  setPreview(undefined);
}

 

  return (
    <div className="create-post__container">
      <form className="create-post" onSubmit={handleSubmit(onSubmit)}>
        <div className="create-post__edit">
          <textarea
            className="create-post__text"
            {...register("text", { required: "Vous devez écrire un message" })}
          ></textarea>

          {selectedFile && <img src={preview} />}
        </div>

        <div className="create-post__btn-container">
          <div className="create-post__btn-img">
            <button className="create-post__btn">Ajouter une image</button>
            <input type="file" {...register("image")} onChange={onSelectFile} />
          </div>

          <input type="submit" className="create-post__btn"></input>
        </div>
      </form>
    </div>
  );
};

export default Createpost;
