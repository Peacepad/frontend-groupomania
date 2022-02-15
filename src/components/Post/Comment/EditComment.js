import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faImage } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const EditComment = ({ comment, playOnce, setPlayOnce }) => {
  const { register, handleSubmit } = useForm();

  const closeEditComment = () => {
    const showEditCommentDOM = document.getElementById(
      `edit-comment-container__${comment.comment_id}`
    );

    if (showEditCommentDOM.style.display === "flex") {
      if (
        document.getElementById(`edit-comment-container__${comment.comment_id}`)
      ) {
        const showEditCommentDOM = document.getElementById(
          `edit-comment-container__${comment.comment_id}`
        );
        showEditCommentDOM.style.display = "none";

        const editCommentBackgroundDOM = document.getElementById(
          `edit-comment-background__${comment.comment_id}`
        );
        editCommentBackgroundDOM.style.display = "none";
        document.getElementById(
          `one-comment__${comment.comment_id}`
        ).style.display = "flex";
      }
    } else {
      if (
        document.getElementById(`edit-comment-container__${comment.comment_id}`)
      ) {
        const showEditCommentDOM = document.getElementById(
          `edit-comment-container__${comment.comment_id}`
        );
        showEditCommentDOM.style.display = "flex";

        const editCommentBackgroundDOM = document.getElementById(
          `edit-comment-background__${comment.comment_id}`
        );
        editCommentBackgroundDOM.style.display = "flex";
        document.getElementById(
          `one-comment__${comment.comment_id}`
        ).style.display = "none";
      }
    }
  };
  const [fileDeleted, setFileDeleted] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [maskImage, setMaskImage] = useState(true);

  const editComment = (data) => {
    const token = localStorage.getItem("token");

    let editCommentData = new FormData();

    if (data.image[0]) {
      const image = data.image[0];
      editCommentData.append("image", image);
    }

    editCommentData.append("userId", token);
    editCommentData.append("text", data.text);
    editCommentData.append("userId", token);
    editCommentData.append("fileDeleted", fileDeleted);

    axios({
      method: "PUT",
      url: `http://localhost:8000/api/comment/${comment.comment_id}`,
      data: editCommentData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: "Bearer " + token,
      },
    })
      .then(() => {
        setPlayOnce(!playOnce);
        const showEditCommentDOM = document.getElementById(
          `edit-comment-container__${comment.comment_id}`
        );
        showEditCommentDOM.style.display = "none";
        const editCommentBackgroundDOM = document.getElementById(
          `edit-comment-background__${comment.comment_id}`
        );
        editCommentBackgroundDOM.style.display = "none";
        document.getElementById(
          `one-comment__${comment.comment_id}`
        ).style.display = "flex";
        setFileDeleted(false);

        setPreview(undefined);
        setMaskImage(true);
        setSelectedFile(undefined);
      })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
  };

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(editComment)();
    }
  };

  // function for extend textarea
  const growTextarea = () => {
    const textarea = document.getElementById(
      `edit-comment-body__${comment.comment_id}`
    );

    textarea.addEventListener("input", (e) => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";

      if (textarea.clientHeight > 197) {
        textarea.style.overflowY = "scroll";
      }
      if (textarea.clientHeight < 197) {
        textarea.style.overflowY = "hidden";
      }
    });
  };

  const selectImage = () => {
    if (document.getElementById(`edit-comment-file__${comment.comment_id}`)) {
      const inputDOM = document.getElementById(
        `edit-comment-file__${comment.comment_id}`
      );

      inputDOM.addEventListener("change", () => {
        if (inputDOM.files[0] !== undefined) {
          document.getElementById(
            `label-file__${comment.comment_id}`
          ).style.backgroundColor = "#66FF99";
        }
      });
    }
  };

  const deleteImage = () => {
    setMaskImage(false);

    setFileDeleted(true);
  };

  let editCommentImage;

  editCommentImage = (
    <div className="edit-comment-file">
      <div
        className="edit-comment-file__close"
        onClick={() => {
          deleteImage();
        }}
      >
        x
      </div>
      <img src={comment.comment_imageURL} alt="image du commentaire" />
    </div>
  );
  if (!comment.comment_imageURL) {
    editCommentImage = (
      <label
        className="label-file button"
        id={`label-file__${comment.comment_id}`}
      >
        <FontAwesomeIcon icon={faImage} />
        <input
          type="file"
          className="comment-file"
          onFocus={selectImage(comment.comment_id)}
          id={`edit-comment-file__${comment.comment_id}`}
          {...register(`image`)}
          name="image"
        ></input>
      </label>
    );
  }

  if (maskImage == false) {
    editCommentImage = (
      <label className="label-file" id={`label-file__${comment.comment_id}`}>
        <FontAwesomeIcon icon={faImage} />
        <input
          type="file"
          className="comment-file"
          onFocus={selectImage(comment.comment_id)}
          id={`edit-comment-file__${comment.comment_id}`}
          {...register(`image`)}
          name="image"
        ></input>
      </label>
    );
  }

  return (
    <div
      className="edit-comment-background"
      id={`edit-comment-background__${comment.comment_id}`}
    >
      <div className="comment-spinner">
        <FontAwesomeIcon icon={faSpinner} />
      </div>

      <form
        className="edit-comment-container"
        id={`edit-comment-container__${comment.comment_id}`}
      >
        <div className="edit-comment__body-container">
          <textarea
            className="edit-comment-body"
            id={`edit-comment-body__${comment.comment_id}`}
            defaultValue={comment.comment_body}
            onKeyPress={handleUserKeyPress}
            onFocus={() => growTextarea()}
            {...register("text")}
          ></textarea>

          {editCommentImage}
        </div>
      </form>

      <div className="edit-close__comment" onClick={() => closeEditComment()}>
        x
      </div>
    </div>
  );
};

export default EditComment;
