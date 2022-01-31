import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const EditPost = ({ post, playOnce, setPlayOnce }) => {
  const { register, handleSubmit } = useForm();

  const sendEdit = (data) => {

    const token = localStorage.getItem("token");

    let editData = new FormData();

    editData.append("userId", token);
    editData.append(`text`, data.text);
    editData.append("postId", post.post_id);

    axios({
        method: "PUT",
        url: `http://localhost:8000/api/post/${post.post_id}`,
        data: editData,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "Bearer " + token,
        },
      })
        .then(() => {
          setPlayOnce(!playOnce);
          const showEditDOM = document.getElementById(
            `edit-container__${post.post_id}`
          );
          showEditDOM.style.display = "none";
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    };



  const closeEdit = () => {
    const showEditDOM = document.getElementById(
        `edit-container__${post.post_id}`
      );
  
      if (showEditDOM.style.display == "flex") {
        if (document.getElementById(`edit-container__${post.post_id}`)) {
          const showEditDOM = document.getElementById(
            `edit-container__${post.post_id}`
          );
          showEditDOM.style.display = "none";
        }
      } else {
        if (document.getElementById(`edit-container__${post.post_id}`)) {
          const showEditDOM = document.getElementById(
            `edit-container__${post.post_id}`
          );
          showEditDOM.style.display = "flex";
        }
      }
  };

  return (
    <div className="edit-container" id={`edit-container__${post.post_id}`}>
      <div className="edit-close" onClick={() => closeEdit()}>
        x
      </div>
      <form className="edit-form" onSubmit={handleSubmit(sendEdit)}>
        <textarea
          className="edit-body"
          defaultValue={post.post_body}
          {...register("text")}
        ></textarea>
        <input type="file" {...register("edit-image")} />
        <input type="submit" className="edit-btn"></input>
      </form>
    </div>
  )
};

export default EditPost;
