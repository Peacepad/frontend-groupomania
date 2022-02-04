import React from "react";
import { useForm } from "react-hook-form";
import {
  Avatar
} from "evergreen-ui";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const EditComment = ({ comment }) => {
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
      }
    }
  };

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
        <div className="edit-close" onClick={() => closeEditComment()}>
          x
        </div>

        <div className="edit-comment__body-container">
          <textarea
            className="edit-comment-body"
            id={`edit-comment-body__${comment.comment_id}`}
            defaultValue={comment.comment_body}
            {...register("text")}
          ></textarea>

          {comment.comment_imageURL && (
            <img src={comment.comment_imageURL} alt="image du commentaire" />
          )}
        </div>
      </form>
    </div>
  );
};

export default EditComment;
