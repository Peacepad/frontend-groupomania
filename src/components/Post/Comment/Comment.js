import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faImage } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Popover,
  Menu,
  Position,
  EditIcon,
  TrashIcon,
  Button,
} from "evergreen-ui";

const Comment = ({ post, playOnce, setPlayOnce }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { register, handleSubmit, setValue, formState } = useForm({
    mode: "onChange",
  });

  const sendComment = async (data) => {
    const token = localStorage.getItem("token");

    let commentData = new FormData();

    const image = data.image[0];

    commentData.append("userId", token);
    commentData.append(`text`, data.text);
    commentData.append("postId", post.post_id);
    commentData.append("image", image);

    axios({
      method: "POST",
      url: `http://localhost:8000/api/comment/${post.post_id}`,
      data: commentData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: "Bearer " + token,
      },
    })
      .then(() => {
        setPlayOnce(!playOnce);
        setValue("text", "");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const deleteComment = (comment_id) => {
    const token = localStorage.getItem("token");
    axios({
      method: "DELETE",
      url: `http://localhost:8000/api/comment/${comment_id}`,
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then(() => {
        setPlayOnce(!playOnce);
      })
      .catch(console.log("Le commentaire n'a pas pu être supprimé"));
  };

  return (
    <>
      <div
        className="comment-container"
        id={`comment-container__${post.post_id}`}
      >
        <form id="comment-form" onSubmit={handleSubmit(sendComment)}>
          <textarea
            {...register(`text`)}
            placeholder="Ecrivez un commentaire ..."
            id={`commentForPost${post.post_id}`}
          ></textarea>

          <label className="label-file">
            {" "}
            <FontAwesomeIcon icon={faImage} />
            <input
              type="file"
              className="comment-image"
              {...register(`image`)}
              name="image"
            ></input>
          </label>

          <input type="submit"></input>
        </form>
      </div>

      <div className="comments">
        <ul className="comments-list">
          {post.listComment.map((comment) => (
            <li
              key={comment.comment_id}
              id={`comment-card${comment.comment_id}`}
              className={`comment-card`}
            >
              <div className="comment-user">
                {comment.comment_user_imageURL ? (
                  <img
                    src={comment.comment_user_imageURL}
                    alt="photo de profil de l'utilisateur"
                  />
                ) : (
                  <Avatar
                    name={
                      comment.comment_firstname + " " + comment.comment_lastname
                    }
                    size={40}
                  />
                )}
              </div>
              <div className="comment-body">
                {comment.comment_body && <p>{comment.comment_body}</p>}

                {comment.comment_imageURL && (
                  <img
                    src={comment.comment_imageURL}
                    alt="illustration du commentaire"
                  />
                )}
              </div>

              {userData.userId === comment.comment_user_id && (
                <div className="comment-edit">
                  <Popover
                    className="comment-edit"
                    position={Position.BOTTOM_RIGHT}
                    content={({ close }) => (
                      <Menu>
                        <Menu.Group>
                          <Menu.Item icon={EditIcon} intent="success">
                            Éditer...
                          </Menu.Item>
                          <Menu.Item
                            icon={TrashIcon}
                            intent="danger"
                            onClick={() => deleteComment(comment.comment_id)}
                          >
                            Supprimer...
                          </Menu.Item>
                        </Menu.Group>
                      </Menu>
                    )}
                  >
                    <Button className="comment-edit__btn">
                      <FontAwesomeIcon icon={faEllipsisH} />
                    </Button>
                  </Popover>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Comment;
