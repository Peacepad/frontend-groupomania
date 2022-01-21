import React, { useState } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import {
    Avatar,

  } from "evergreen-ui";

const Comment = ({ post }) => {
  
  const { register, handleSubmit, reset } = useForm();

  const sendComment = async(data) => {
    const token = localStorage.getItem("token");

    let commentData = new FormData();

    commentData.append("userId", token);
    commentData.append(`text`, data.text);
    commentData.append("postId", post.post_id);

    axios({
      method: "POST",
      url: `http://localhost:8000/api/post/${post.post_id}/comment/create`,
      data: commentData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: "Bearer " + token,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  return (
      <>

    <div className="comments">
                <ul className="comments-list">
              {post.listComment.map((comment) => (
                <li key={comment.comment_id}>
                    <div className="comment-card">
                        <div className="comment-user">
                        {comment.comment_user_imageURL ? (
                    <img
                      src={comment.comment_user_imageURL}
                      alt="photo de profil de l'utilisateur"
                    />
                  ) : (
                    <Avatar
                      name={comment.comment_firstname + " " + comment.comment_lastname}
                      size={40}
                    />
                  )}
                        </div>
                        <div className="comment-body">
                        {comment.comment_body}
                        </div>
                    </div>
                  
                </li>
              ))}
              </ul>
                </div>


    <div className="comment-container">
      <form id="comment-form" onSubmit={handleSubmit(sendComment)}>
        <textarea {...register(`text`)}></textarea>
        <input type="submit"></input>
      </form>
    </div>
    </>
  );
};

export default Comment;
